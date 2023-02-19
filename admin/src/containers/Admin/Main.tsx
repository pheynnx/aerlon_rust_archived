import { Component, createSignal, For, onMount } from "solid-js";
import axios from "axios";

import "~/styles/admin.scss";
import Spinner from "~/components/Spinner/Spinner";

interface IPost {
  id: string;
  date: Date;
  slug: string;
  title: string;
  series: string;
  categories: string[];
  markdown: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const Main: Component = () => {
  const [posts, setPosts] = createSignal<IPost[]>([]);

  onMount(async () => {
    try {
      const response = await axios.get("/admin/api/post");
      setPosts(response.data);
    } catch (error) {}
  });

  return (
    <main>
      <div>
        <div class="admin-header">
          <span class="admin-header-logo">EAC Admin</span>
          <span>-</span>
          <span class="admin-header-new">New Post</span>
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
          <div class="admin-panel-posts">
            <For each={posts()} fallback={<Spinner startTime={0}></Spinner>}>
              {(post, i) => (
                <>
                  <div class="admin-panel-post">
                    <p>Slug: {post.slug}</p>
                    <p>Title: {post.title}</p>
                    <p>Date: {new Date(post.date).toDateString()}</p>
                    <p>Published: {`${post.published}`}</p>
                    <button>Update</button>
                    <button>Delete</button>
                  </div>
                </>
              )}
            </For>
          </div>
          <div class="admin-panel-editor"></div>
        </div>
      </div>
    </main>
  );
};

const Creator: Component = () => {
  return <></>;
};

const Updater: Component<IPost> = (props) => {
  return <></>;
};

export default Main;
