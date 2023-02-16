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
        <h3>Admin Panel</h3>
        <button>New Post</button>
        <form action="/admin/logout" method="post">
          <button type="submit">Logout</button>
        </form>
        <For each={posts()} fallback={<Spinner startTime={0}></Spinner>}>
          {(post, i) => (
            <>
              <div data-index={i()}>
                <p>Slug: {post.slug}</p>
                <p>Title: {post.title}</p>
                <p>Date: {new Date(post.date).toDateString()}</p>
                <button>Update</button>
                <button>Delete</button>
              </div>
              <br />
            </>
          )}
        </For>
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
