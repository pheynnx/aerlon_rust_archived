import { Component, createComputed, createSignal, Index } from "solid-js";
import axios from "axios";

import { addCategory, removeCategory, updatePostField } from "./formUpdater";
import { timeFormatISO, timeFormatYYYYMMDD } from "../utils/dateFormater";
import { IPost } from "../api/types";

interface IProps {
  adminState: {
    posts: boolean;
    metrics: boolean;
    editor: boolean;
    editorContent: {
      creator: boolean;
      editorPost: IPost;
    };
  };
  fetchPostsHandler: () => Promise<void>;
}

const Updater: Component<IProps> = (props) => {
  const [postData, setPostData] = createSignal<IPost>(
    props.adminState.editorContent.editorPost
  );

  createComputed(() => {
    setPostData({ ...props.adminState.editorContent.editorPost });
  });

  // const postUpdateSubmit = () => {};

  return (
    <>
      <div class="admin-panel-editor-header">
        <h3>{postData().title}</h3>
      </div>
      <div class="admin-panel-editor-form">
        <label class="admin-panel-editor-form-label" for="title">
          Title:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="title"
          type="text"
          onInput={updatePostField(setPostData, "title")}
          value={postData().title}
        ></input>
        <label class="admin-panel-editor-form-label" for="slug">
          Slug:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="slug"
          type="text"
          onInput={updatePostField(setPostData, "slug")}
          value={postData().slug}
        ></input>
        <div class="admin-panel-editor-form-published">
          <label class="admin-panel-editor-form-label" for="published">
            Published:
          </label>
          <input
            class="admin-panel-editor-form-checkbox"
            id="published"
            type="checkbox"
            onInput={updatePostField(setPostData, "published")}
            checked={postData().published}
          ></input>
        </div>
        <div class="admin-panel-editor-form-published">
          <label class="admin-panel-editor-form-label" for="featured">
            Featured:
          </label>
          <input
            class="admin-panel-editor-form-checkbox"
            id="published"
            type="checkbox"
            onInput={updatePostField(setPostData, "featured")}
            checked={postData().featured}
          ></input>
        </div>
        <label class="admin-panel-editor-form-label" for="date">
          Date:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="date"
          type="date"
          onInput={updatePostField(setPostData, "date")}
          value={timeFormatYYYYMMDD(postData().date)}
        ></input>
        <label class="admin-panel-editor-form-label" for="series">
          Series:
        </label>
        <input
          class="admin-panel-editor-form-input"
          type="series"
          onInput={updatePostField(setPostData, "series")}
          value={postData().series}
        ></input>
        <label class="admin-panel-editor-form-label" for="categories">
          Categories:
        </label>
        <Index each={postData().categories}>
          {(c, i) => (
            <div class="admin-panel-editor-form-category">
              <input
                class="admin-panel-editor-form-input-category"
                id="categories"
                type="text"
                onInput={updatePostField(setPostData, "categories", i)}
                value={c()}
              ></input>
              <button
                class="admin-panel-editor-form-category-button remove"
                onClick={removeCategory(setPostData, i)}
              >
                <svg
                  class="admin-panel-editor-form-category-button-svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 188 188"
                  version="1.1"
                  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                >
                  <path
                    d="M142.467,93.967l-97,0"
                    style="fill:none;stroke:#fff;stroke-width:16.67px;"
                  />
                </svg>
              </button>
            </div>
          )}
        </Index>
        <div class="admin-panel-editor-form-category-adder">
          <button
            class="admin-panel-editor-form-category-button add"
            onClick={() => addCategory(setPostData)}
          >
            <svg
              class="admin-panel-editor-form-category-button-svg"
              width="100%"
              height="100%"
              viewBox="0 0 114 114"
              version="1.1"
              style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
            >
              <path
                d="M56.833,8.333l0,97"
                style="fill:none;stroke:#fff;stroke-width:16.67px;"
              />
              <path
                d="M105.333,56.833l-97,0"
                style="fill:none;stroke:#fff;stroke-width:16.67px;"
              />
            </svg>
          </button>
        </div>
        <label class="admin-panel-editor-form-label" for="post_snippet">
          Post Snippet:
        </label>
        <textarea
          class="admin-panel-editor-form-textarea"
          id="post_snippet"
          onInput={updatePostField(setPostData, "post_snippet")}
          value={postData().post_snippet}
        ></textarea>
        <label class="admin-panel-editor-form-label" for="markdown">
          Markdown:
        </label>
        <textarea
          class="admin-panel-editor-form-textarea"
          id="markdown"
          onInput={updatePostField(setPostData, "markdown")}
          value={postData().markdown}
        ></textarea>
        <button
          class="admin-panel-editor-form-button update"
          // NEEDS TO MOVE UPWARDS AND NEEDS VALIDATION AND ERROR HANDLING
          onClick={async () => {
            try {
              await axios.post(`/admin/api/post/${postData().id}`, {
                ...postData(),
                categories: postData().categories.filter((c) => c != ""),
                date: timeFormatISO(postData().date),
              });
              props.fetchPostsHandler();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Updater;
