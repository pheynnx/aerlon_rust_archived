import axios from "axios";
import { Component, createSignal, Index } from "solid-js";
import { createPost } from "~/api/admin";

import { IPost } from "~/api/types";
import { timeFormatISO, timeFormatYYYYMMDD } from "~/utils/dateFormater";

interface IProps {
  fetchPostsHandler: () => Promise<void>;
}

const Creator: Component<IProps> = (props) => {
  const [newPost, setNewPost] = createSignal<IPost>({
    id: "",
    date: new Date().toISOString(),
    slug: "",
    title: "",
    series: "",
    categories: [],
    markdown: "",
    published: false,
    featured: false,
    created_at: "",
    updated_at: "",
  });

  const updatePostField =
    (
      fieldName:
        | "title"
        | "slug"
        | "published"
        | "featured"
        | "date"
        | "series"
        | "categories"
        | "markdown",
      index?: number
    ) =>
    (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement;
      setNewPost((prev) => {
        if (fieldName === "categories") {
          prev.categories[index as number] = inputElement.value;
          return { ...prev };
        }
        if (fieldName === "published") {
          prev.published = !prev.published;
          return { ...prev };
        }
        if (fieldName === "featured") {
          prev.featured = !prev.featured;
          return { ...prev };
        }
        if (fieldName === "date") {
          return { ...prev, date: timeFormatISO(inputElement.value) };
        }

        return {
          ...prev,
          [fieldName]: inputElement.value,
        };
      });
    };

  const addCategory = () => {
    setNewPost((prev) => {
      if (prev.categories[prev.categories.length - 1] === "") {
        return { ...prev };
      }
      return { ...prev, categories: [...prev.categories, ""] };
    });
  };

  const removeCategory = (index: number) => (event: Event) => {
    setNewPost((prev) => {
      return {
        ...prev,
        categories: prev.categories.filter((c) => c !== prev.categories[index]),
      };
    });
  };

  // NEEDS VALIDATION AND ERROR HANDLING
  const createPostHandler = async () => {
    try {
      await createPost({ ...newPost() });
      props.fetchPostsHandler();
    } catch (error) {}
  };

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
          onInput={updatePostField("title")}
          value={newPost().title}
        ></input>
        <label class="admin-panel-editor-form-label" for="slug">
          Slug:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="slug"
          type="text"
          onInput={updatePostField("slug")}
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
            onInput={updatePostField("published")}
            checked={newPost().published}
          ></input>
        </div>
        <div class="admin-panel-editor-form-published">
          <label class="admin-panel-editor-form-label" for="featured">
            Featured:
          </label>
          <input
            class="admin-panel-editor-form-checkbox"
            id="featured"
            type="checkbox"
            onInput={updatePostField("featured")}
            checked={newPost().featured}
          ></input>
        </div>
        <label class="admin-panel-editor-form-label" for="date">
          Date:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="date"
          type="date"
          onInput={updatePostField("date")}
          value={timeFormatYYYYMMDD(newPost().date)}
        ></input>
        <label class="admin-panel-editor-form-label" for="series">
          Series:
        </label>
        <input
          class="admin-panel-editor-form-input"
          type="series"
          onInput={updatePostField("series")}
          value={newPost().series}
        ></input>
        <label class="admin-panel-editor-form-label" for="categories">
          Categories:
        </label>
        <Index each={newPost().categories}>
          {(c, i) => (
            <div class="admin-panel-editor-form-category">
              <input
                class="admin-panel-editor-form-input"
                id="categories"
                type="text"
                onInput={updatePostField("categories", i)}
                value={c()}
              ></input>
              <button
                class="admin-panel-editor-form-category-button remove"
                onClick={removeCategory(i)}
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
            onClick={addCategory}
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
        <label class="admin-panel-editor-form-label" for="markdown">
          Markdown:
        </label>
        <textarea
          class="admin-panel-editor-form-textarea"
          id="markdown"
          onInput={updatePostField("markdown")}
          value={newPost().markdown}
        ></textarea>
        <button
          class="admin-panel-editor-form-button create"
          onClick={createPostHandler}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default Creator;
