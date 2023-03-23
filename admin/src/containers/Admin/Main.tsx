import {
  Component,
  createEffect,
  createSignal,
  For,
  Match,
  on,
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
import Navigator from "./modules/Navigator";

const MODEWIDTH = 750;

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

  const handler = (_: Event) => {
    setRect({ height: window.innerHeight, width: window.innerWidth });
    if (window.innerWidth <= MODEWIDTH) {
      if (adminState.editor) {
        setAdminStore({ posts: false });
      }
    }
    if (window.innerWidth >= MODEWIDTH) {
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
    if (window.innerWidth <= MODEWIDTH) {
      if (adminState.editor) {
        setAdminStore({ posts: false });
      }
    }
  };

  const editorCreateSelector = () => {
    setSelectedPost();
    setShowCreator(true);
    setAdminStore({ editor: true });
    if (window.innerWidth <= MODEWIDTH) {
      if (adminState.editor) {
        setAdminStore({ posts: false });
      }
    }
  };

  return (
    <main>
      <div>
        <div class="admin-console">
          <div class="admin-navigator">
            <Navigator
              editorCreateSelector={editorCreateSelector}
              setAdminStore={setAdminStore}
              setSelectedPost={setSelectedPost}
            />
          </div>
          <div
            class={`admin-panel ${
              rect().width >= MODEWIDTH && adminState.editor && adminState.posts
                ? "multi-mode"
                : "single-mode"
            }`}
          >
            <Show when={adminState.posts}>
              <SidePanel
                posts={posts()}
                editorUpdatePostSelector={editorUpdatePostSelector}
                selectedPost={selectedPost}
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
      </div>
    </main>
  );
};

export default Main;
