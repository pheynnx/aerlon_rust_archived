import { Component, For } from "solid-js";

import Spinner from "~/components/Spinner/Spinner";
import { IPost } from "~/api/types";

interface IProps {
  posts: IPost[];
  editorUpdatePostSelector: (post: IPost) => (e: any) => void;
}

const PostPanel: Component<IProps> = (props) => {
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
              <span class="admin-panel-post-info">Slug: {post.slug}</span>
              <span class="admin-panel-post-info">Title: {post.title}</span>
              <span class="admin-panel-post-info">
                Date: {new Date(post.date).toLocaleDateString()}
              </span>
              <span class="admin-panel-post-info">
                Published: {`${post.published}`}
              </span>
              <div>
                <button
                  class="admin-panel-post-button"
                  onClick={props.editorUpdatePostSelector(post)}
                >
                  Update
                </button>
                <button class="admin-panel-post-button">Delete</button>
              </div>
            </div>
          </>
        )}
      </For>
    </div>
  );
};

export default PostPanel;
