import { Component, createSignal, Index } from "solid-js";

import { IPost } from "~/api/types";

const Creator: Component = () => {
  const [newPost, setNewPost] = createSignal<IPost>({
    id: "",
    date: undefined,
    slug: "",
    title: "",
    series: "",
    categories: [],
    markdown: "",
    published: false,
    created_at: "",
    updated_at: "",
  });

  return (
    <>
      <div class="admin-panel-editor-header">
        <h3>New Post</h3>
      </div>
      <div class="admin-panel-editor-form">
        <label class="admin-panel-editor-form-label" for="title">
          Title:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="title"
          type="text"
          // onInput={updatePostField('title')}
          value={newPost().title}
        ></input>
        <label class="admin-panel-editor-form-label" for="slug">
          Slug:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="slug"
          type="text"
          // onInput={updatePostField('title')}
          value={newPost().slug}
        ></input>
        <div class="admin-panel-editor-form-published">
          <label class="admin-panel-editor-form-label" for="published">
            Published:
          </label>
          <input
            class="admin-panel-editor-form-checkbox"
            id="published"
            type="checkbox"
            // onInput={updatePostField('title')}
            checked={newPost().published}
          ></input>
        </div>
        <label class="admin-panel-editor-form-label" for="date">
          Date:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="date"
          type="date"
          // onInput={updatePostField('date')}
          // value={post()?.date.split('T')[0]}
        ></input>
        <label class="admin-panel-editor-form-label" for="series">
          Series:
        </label>
        <input
          class="admin-panel-editor-form-input"
          type="series"
          // onInput={updatePostField('series')}
          // value={post()?.series}
        ></input>
        <label class="admin-panel-editor-form-label" for="categories">
          Categories:
        </label>
        <Index each={newPost().categories}>
          {(c, i) => (
            <>
              <input
                class="admin-panel-editor-form-input"
                id="categories"
                type="text"
                //   onInput={updatePostField("categories", i)}
                value={c()}
              ></input>
              {/* <button onClick={removeCategory(i)}>-</button> */}
            </>
          )}
        </Index>
        {/* <button onClick={addCategory}>+</button> */}
        <label class="admin-panel-editor-form-label" for="markdown">
          Markdown:
        </label>
        <textarea
          class="admin-panel-editor-form-textarea"
          id="markdown"
          // onInput={updatePostField('markdown')}
          // value={post()?.markdown}
        ></textarea>
        <button
          class="admin-panel-editor-form-button create"
          // onClick={async () => {
          //   try {
          //   } catch (error) {}
          // }}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default Creator;
