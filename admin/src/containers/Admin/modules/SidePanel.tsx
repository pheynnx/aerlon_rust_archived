import { Component, For } from "solid-js";

import Spinner from "~/components/Spinner/Spinner";
import { IPost } from "~/api/types";

interface IProps {
  posts: IPost[];
  editorUpdatePostSelector: (post: IPost) => (e: any) => void;
}

const SidePanel: Component<IProps> = (props) => {
  return (
    <div class="admin-panel-posts">
      <For
        each={props.posts}
        fallback={
          <div style={{ "margin-top": "15px" }}>
            <Spinner startTime={0}></Spinner>
          </div>
        }
      >
        {(post, i) => (
          <>
            <div class="admin-panel-post">
              <p>Slug: {post.slug}</p>
              <p>Title: {post.title}</p>
              <p>Date: {new Date(post.date).toLocaleDateString()}</p>
              <p>Published: {`${post.published}`}</p>
              <button onClick={props.editorUpdatePostSelector(post)}>
                Update
              </button>
              <button>Delete</button>
            </div>
          </>
        )}
      </For>
    </div>
  );
};

export default SidePanel;
