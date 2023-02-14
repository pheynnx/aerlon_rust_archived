import { Component, createSignal, For, onMount } from "solid-js";
import axios from "axios";

import "~/styles/admin.scss";

const Main: Component = () => {
  const [posts, setPosts] = createSignal([]);

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
        <For each={posts()} fallback={<></>}>
          {(post, i) => (
            <>
              <div data-index={i()}>
                {/* <p>{post.id}</p> */}
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

export default Main;
