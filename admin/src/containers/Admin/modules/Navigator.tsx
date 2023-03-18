import { Component } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

interface IProps {
  editorCreateSelector: () => void;
  setAdminStore: SetStoreFunction<{
    editor: boolean;
    posts: boolean;
  }>;
}

const Navigator: Component<IProps> = (props) => {
  return (
    <>
      {/* THESE WILL BE SVG/PNG ICONS */}
      <div class="admin-navigator-link">
        <span>EAC</span>
      </div>
      {/* will be a home when posts are true, a back arrow when posts not true */}
      <div
        onClick={() => props.setAdminStore({ posts: true, editor: false })}
        class="admin-navigator-link"
      >
        <span>H</span>
      </div>
      {/* new post button */}
      <div onClick={props.editorCreateSelector} class="admin-navigator-link">
        <span>N</span>
      </div>
      {/* refresh cache from database */}
      <div class="admin-navigator-link">
        <span>R</span>
      </div>
      {/* go to main site */}
      <div class="admin-navigator-link">
        <span>G</span>
      </div>
      {/* logout button */}
      <form
        class="admin-navigator-link"
        id="admin-logout"
        action="/admin/logout"
        method="post"
        onClick={() => {
          const form = document.getElementById(
            "admin-logout"
          ) as HTMLFormElement;
          form.submit();
        }}
      >
        <span>L</span>
      </form>
    </>
  );
};

export default Navigator;
