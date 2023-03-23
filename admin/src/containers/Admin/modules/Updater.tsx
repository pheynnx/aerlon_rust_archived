import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Index,
  on,
} from "solid-js";
import axios from "axios";

import { timeFormatISO, timeFormatYYYYMMDD } from "~/utils/dateFormater";
import { IPost } from "~/api/types";

interface IProps {
  post: Accessor<IPost>;
  fetchAll: () => Promise<void>;
}

const Updater: Component<IProps> = (props) => {
  const [postData, setPostData] = createSignal<IPost>(props.post());

  createEffect(
    on(props.post, () => {
      setPostData(props.post());
    }),
    on(postData, () => {
      console.log(postData().date);
    })
  );

  const updatePostField =
    (
      fieldName:
        | "title"
        | "slug"
        | "published"
        | "date"
        | "series"
        | "categories"
        | "markdown",
      index?: number
    ) =>
    (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement;
      setPostData((prev) => {
        if (fieldName === "categories") {
          prev.categories[index as number] = inputElement.value;
          return { ...prev };
        }
        if (fieldName === "published") {
          prev.published = !prev.published;
          return { ...prev };
        }

        return {
          ...prev,
          [fieldName]: inputElement.value,
        };
      });
    };

  const postUpdateSubmit = (e) => {};

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
          onInput={updatePostField("title")}
          value={postData().title}
        ></input>
        <label class="admin-panel-editor-form-label" for="slug">
          Slug:
        </label>
        <input
          class="admin-panel-editor-form-input"
          id="slug"
          type="text"
          onInput={updatePostField("slug")}
          value={postData().slug}
        ></input>
        <div class="admin-panel-editor-form-published">
          <label class="admin-panel-editor-form-label" for="published">
            Published:
          </label>
          {/* THERE IS BUG ON THIS INPUT, STATE PERSISTS SOMETIMES */}
          <input
            class="admin-panel-editor-form-checkbox"
            id="published"
            type="checkbox"
            onInput={updatePostField("published")}
            checked={postData().published}
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
          value={timeFormatYYYYMMDD(postData().date)}
        ></input>
        <label class="admin-panel-editor-form-label" for="series">
          Series:
        </label>
        <input
          class="admin-panel-editor-form-input"
          type="series"
          onInput={updatePostField("series")}
          value={postData().series}
        ></input>
        <label class="admin-panel-editor-form-label" for="categories">
          Categories:
        </label>
        <Index each={postData().categories}>
          {(c, i) => (
            <>
              <input
                class="admin-panel-editor-form-input"
                id="categories"
                type="text"
                onInput={updatePostField("categories", i)}
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
          onInput={updatePostField("markdown")}
          value={postData().markdown}
        ></textarea>
        <button
          class="admin-panel-editor-form-button update"
          onClick={async () => {
            try {
              await axios.post(`/admin/api/post/${postData().id}`, {
                ...postData(),
                date: timeFormatISO(postData().date),
              });
              props.fetchAll();
            } catch (error) {}
          }}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Updater;
