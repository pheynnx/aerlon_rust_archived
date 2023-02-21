import { Component, createSignal, For, Match, onMount, Switch } from "solid-js";
import axios from "axios";

import Updater from "./modules/Updater";
import Creator from "./modules/Creator";
import Spinner from "~/components/Spinner/Spinner";
import { IPost } from "~/api/types";

import "~/styles/admin.scss";
import SidePanel from "./modules/SidePanel";

const Main: Component = () => {
  const [posts, setPosts] = createSignal<IPost[]>([]);
  const [showCreator, setShowCreator] = createSignal<boolean>(false);
  const [selectedPost, setSelectedPost] = createSignal<IPost>();

  onMount(async () => {
    try {
      await getAllPosts();
    } catch (error) {}
  });

  const getAllPosts = async () => {
    const response = await axios.get("/admin/api/post");
    setPosts(response.data);
  };

  const editorUpdatePostSelector = (post: IPost) => (_: Event) => {
    setShowCreator(false);
    setSelectedPost(post);
  };

  return (
    <main>
      <div>
        <div class="admin-header">
          <span class="admin-header-logo">EAC Admin</span>
          <span>-</span>
          <span
            onClick={() => {
              setSelectedPost();
              // setSelectedPostID();
              setShowCreator(true);
            }}
            class="admin-header-new"
          >
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
        <div class="admin-panel">
          <SidePanel
            posts={posts()}
            editorUpdatePostSelector={editorUpdatePostSelector}
          />
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
        </div>
      </div>
    </main>
  );
};

export default Main;
