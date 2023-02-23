import {
  Component,
  createSignal,
  For,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";
import axios from "axios";

import Updater from "./modules/Updater";
import Creator from "./modules/Creator";
import { IPost } from "~/api/types";

import "~/styles/admin.scss";
import SidePanel from "./modules/PostPanel";
import { createStore } from "solid-js/store";

// Panel state
// admin-panel: single-mode | wide-mode
// admin-panel-editor: show | hidden
// admin-panel-posts: show | hidden
// above 600px show both
// below 600px show posts or editor but not both

const Main: Component = () => {
  const [posts, setPosts] = createSignal<IPost[]>([]);
  const [showCreator, setShowCreator] = createSignal<boolean>(false);
  const [selectedPost, setSelectedPost] = createSignal<IPost>();

  const [rect, setRect] = createSignal({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [adminState, setAdminStore] = createStore<{
    editor: boolean;
    posts: boolean;
  }>({ editor: false, posts: true });

  const handler = (event: Event) => {
    setRect({ height: window.innerHeight, width: window.innerWidth });
    if (window.innerWidth <= 500) {
      if (adminState.editor) {
        setAdminStore({ posts: false });
      }
    }
    if (window.innerWidth >= 500) {
      setAdminStore({ posts: true });
    }
  };

  onMount(async () => {
    window.addEventListener("resize", handler);
    try {
      await getAllPosts();
    } catch (error) {}
  });

  onCleanup(() => {
    window.removeEventListener("resize", handler);
  });

  const getAllPosts = async () => {
    const response = await axios.get("/admin/api/post");
    setPosts(response.data);
  };

  const editorUpdatePostSelector = (post: IPost) => () => {
    setShowCreator(false);
    setSelectedPost(post);
    setAdminStore({ editor: true });
    if (window.innerWidth <= 500) {
      if (adminState.editor) {
        setAdminStore({ posts: false });
      }
    }
  };

  const editorCreateSelector = () => {
    setSelectedPost();
    setShowCreator(true);
    setAdminStore({ editor: true });
    if (window.innerWidth <= 500) {
      if (adminState.editor) {
        setAdminStore({ posts: false });
      }
    }
  };

  return (
    <main>
      <div>
        <div class="admin-header">
          <span class="admin-header-logo">EAC Admin</span>
          <span>-</span>
          <span onClick={editorCreateSelector} class="admin-header-new">
            New Post
          </span>
          <form
            class="admin-header-logout"
            id="admin-logout"
            action="/admin/logout"
            method="post"
          >
            <span
              onClick={() => {
                const form = document.getElementById(
                  "admin-logout"
                ) as HTMLFormElement;
                form.submit();
              }}
            >
              Logout
            </span>
          </form>
        </div>
        <div
          class={`admin-panel ${
            rect().width >= 500 && adminState.editor && adminState.posts
              ? "multi-mode"
              : "single-mode"
          }`}
        >
          <Show when={adminState.posts}>
            <SidePanel
              posts={posts()}
              editorUpdatePostSelector={editorUpdatePostSelector}
            />
          </Show>
          <Show when={adminState.editor}>
            <div class="admin-panel-editor">
              <Switch>
                <Match when={selectedPost()}>
                  <Updater post={selectedPost} fetchAll={getAllPosts} />
                </Match>
                <Match when={showCreator()}>
                  <Creator />
                </Match>
              </Switch>
            </div>
          </Show>
        </div>
      </div>
    </main>
  );
};

export default Main;
