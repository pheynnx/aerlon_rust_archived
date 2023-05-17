import { Accessor, Component, For } from "solid-js";

import Spinner from "../components/Spinner/Spinner";
import { IPost } from "../api/types";

interface IProps {
  posts: IPost[];
  editorUpdatePostSelector: (post: IPost) => (e: any) => void;
  adminState: {
    posts: boolean;
    metrics: boolean;
    editor: boolean;
    editorContent: {
      creator: boolean;
      editorPost: IPost;
    };
  };
}

const PostPanel: Component<IProps> = (props) => {
  return (
    <div class="admin-panel-posts">
      <h3>Posts</h3>
      <For
        each={props.posts}
        fallback={
          <div class="admin-panel-spinner ">
            <Spinner startTime={0}></Spinner>
          </div>
        }
      >
        {(post, i) => (
          <>
            <div
              class={`admin-panel-post ${
                props.adminState.editorContent.editorPost?.id === post.id
                  ? "active"
                  : ""
              }`}
            >
              <span class="admin-panel-post-info-title">{post.title}</span>
              <span class="admin-panel-post-info">Slug: {post.slug}</span>
              <span class="admin-panel-post-info">
                Series: {`${post.series}`}
              </span>
              <span class="admin-panel-post-info">
                Date: {new Date(post.date).toLocaleDateString()}
              </span>
              <span class="admin-panel-post-info">
                Created: {`${new Date(post.created_at).toLocaleString()}`}
              </span>
              <span class="admin-panel-post-info">
                Updated: {`${new Date(post.updated_at).toLocaleString()}`}
              </span>
              <span class="admin-panel-post-info">
                Published: {`${post.published}`}
              </span>
              <span class="admin-panel-post-info">
                Featured: {`${post.featured}`}
              </span>
              <div>
                <button
                  class="admin-panel-post-button update"
                  onClick={props.editorUpdatePostSelector(post)}
                >
                  Update
                </button>
                <button class="admin-panel-post-button delete">Delete</button>
              </div>
            </div>
          </>
        )}
      </For>
    </div>
  );
};

export default PostPanel;
