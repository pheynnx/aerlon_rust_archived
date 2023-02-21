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
        <span>New Post</span>
      </div>
      <div class="admin-panel-editor-form">
        <label for="title">Title:</label>
        <input
          id="title"
          type="text"
          // onInput={updatePostField('title')}
          value={newPost().title}
        ></input>
        <label for="slug">Slug:</label>
        <input
          id="slug"
          type="text"
          // onInput={updatePostField('title')}
          value={newPost().slug}
        ></input>
        <label for="published">Published:</label>
        <input
          id="published"
          type="checkbox"
          // onInput={updatePostField('title')}
          checked={newPost().published}
        ></input>
        <label for="date">Date:</label>
        <input
          id="date"
          type="date"
          // onInput={updatePostField('date')}
          // value={post()?.date.split('T')[0]}
        ></input>
        <label for="series">Series:</label>
        <input
          type="series"
          // onInput={updatePostField('series')}
          // value={post()?.series}
        ></input>
        <label for="categories">Categories:</label>
        <Index each={newPost().categories}>
          {(c, i) => (
            <>
              <input
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
        <label for="markdown">Markdown:</label>
        <textarea
          class="admin-textarea"
          id="markdown"
          // onInput={updatePostField('markdown')}
          // value={post()?.markdown}
        ></textarea>
        {/* <button
      onClick={async () => {
        try {
          await adminUpdatePost(post());
        } catch (error) {}
      }}
    >
      Update
    </button> */}
      </div>
    </>
  );
};

export default Creator;
