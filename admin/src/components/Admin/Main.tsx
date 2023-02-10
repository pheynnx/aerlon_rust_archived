import { Component, createSignal, For, onMount } from "solid-js";
import axios from "axios";

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
        <a href="/admin/new">New</a>
        <a href="/admin/update">Update</a>
        <For each={posts()} fallback={<></>}>
          {(post, i) => (
            <>
              <div data-index={i()}>
                <p>{post.id}</p>
                <p>{post.slug}</p>
                <p>{post.title}</p>
                <p>{new Date(post.date).toDateString()}</p>
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
