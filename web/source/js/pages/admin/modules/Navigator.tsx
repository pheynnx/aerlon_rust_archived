import { Component, Setter, createSignal, onMount } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { IPost } from "../api/types";

interface IProps {
  editorCreateSelector: () => void;
  setAdminState: SetStoreFunction<{
    posts: boolean;
    metrics: boolean;
    editor: boolean;
    editorContent: {
      creator: boolean;
      editorPost: IPost;
    };
  }>;
}

const Navigator: Component<IProps> = (props) => {
  const [version, setVersion] = createSignal("");
  onMount(async () => {
    const response = await fetch(
      "https://api.github.com/repos/ericarthurc/ericarthurc.com/commits"
    );
    const data = await response.json();
    setVersion(data[0].commit.message.split(" ")[0]);
  });
  return (
    <>
      {/* THESE WILL BE SVG/PNG ICONS */}
      <div class="admin-navigator-link logo">
        <svg
          class="admin-navigator-link-svg-logo"
          width="100%"
          height="100%"
          viewBox="0 0 1500 1500"
          version="1.1"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
        >
          <path
            id="shape_fill"
            d="M1500,750l-750,-750l-750,750l750,750l750,-750Z"
            style="fill:none;"
          />
          <g>
            <g>
              <path
                style="fill:#fff;"
                d="M1185.85,749.999l-435.926,-435.923l-298.059,298.059l167.329,-0l130.977,-130.978l268.811,268.842l-268.811,268.844l-130.977,-130.978l-167.329,0l298.059,298.059l435.926,-435.925Z"
              />
              <path
                style="fill:#db2e2e;"
                d="M590.109,802.2l0.001,-104.4l-369.145,0l529.084,-529.084l449.843,449.842l168.666,0l-618.558,-618.558l-750,750l750,750l618.558,-618.558l-168.666,-0l-449.843,449.842l-529.084,-529.084l369.144,-0Z"
              />
            </g>
          </g>
        </svg>
      </div>
      {/* will be a home when posts are true, a back arrow when posts not true */}
      <div class="admin-navigator-link">
        <svg
          onClick={() => {
            props.setAdminState({
              posts: true,
              metrics: false,
              editor: false,
              editorContent: { creator: false, editorPost: null },
            });
          }}
          class="admin-navigator-link-svg"
          width="100%"
          height="100%"
          viewBox="0 0 157 169"
          version="1.1"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
          <path
            d="M78.333,8.333l-70,54l0,98l140,0l0,-98l-70,-54Z"
            style="fill:none;stroke-width:16.67px;"
          />
        </svg>
      </div>
      {/* new post button */}
      <div class="admin-navigator-link">
        <svg
          onClick={props.editorCreateSelector}
          class="admin-navigator-link-svg"
          width="100%"
          height="100%"
          viewBox="0 0 188 188"
          version="1.1"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
          <circle
            cx="93.967"
            cy="93.967"
            r="85.634"
            style="fill:none;stroke-width:16.67px;"
          />
          <g>
            <path
              d="M93.967,45.467l0,97"
              style="fill:none;stroke-width:16.67px;"
            />
            <path
              d="M142.467,93.967l-97,0"
              style="fill:none;stroke-width:16.67px;"
            />
          </g>
        </svg>
      </div>
      {/* metrics page */}
      <div class="admin-navigator-link">
        <svg
          onClick={() => {
            props.setAdminState({
              metrics: true,
              posts: false,
              editor: false,
              editorContent: { creator: false, editorPost: null },
            });
          }}
          class="admin-navigator-link-svg"
          width="100%"
          height="100%"
          viewBox="0 0 131 160"
          version="1.1"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
          <path
            d="M8.333,151.333l0,-100"
            style="fill:none;stroke-width:16.67px;"
          />
          <path
            d="M46.333,151.333l0,-143"
            style="fill:none;stroke-width:16.67px;"
          />
          <path
            d="M84.333,151.333l0,-70"
            style="fill:none;stroke-width:16.67px;"
          />
          <path
            d="M122.333,151.333l0,-118"
            style="fill:none;stroke-width:16.67px;"
          />
        </svg>
      </div>
      {/* refresh redis cache from database */}
      <div class="admin-navigator-link">
        <svg
          class="admin-navigator-link-svg"
          width="100%"
          height="100%"
          viewBox="0 0 188 209"
          version="1.1"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
          <g id="reload">
            <path
              d="M93.967,29.332c47.263,0 85.634,38.372 85.634,85.634c-0,47.263 -38.371,85.634 -85.634,85.634c-47.262,-0 -85.634,-38.371 -85.634,-85.634"
              style="fill:none;stroke-width:16.67px;"
            />
            <path
              d="M74.968,29.132l20.798,21.199l-20.798,-21.199l21.199,-20.799l-21.199,20.799Z"
              style="fill:none;stroke-width:16.67px;"
            />
          </g>
        </svg>
      </div>
      {/* go to main site */}
      <div
        class="admin-navigator-link"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <span>G</span>
      </div>
      {/* logout button */}
      <form
        class="admin-navigator-link"
        id="admin-logout"
        action="/admin/logout"
        method="post"
      >
        <svg
          onClick={() => {
            const form = document.getElementById(
              "admin-logout"
            ) as HTMLFormElement;
            form.submit();
          }}
          class="admin-navigator-link-svg"
          width="100%"
          height="100%"
          viewBox="0 0 183 187"
          version="1.1"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
          <path
            d="M140.333,38.333l0,-30l-104,0l0,170l104,0l0,-30"
            style="fill:none;stroke-width:16.67px;"
          />
          <path
            d="M112.333,38.333l0,-30l-104,0l0,170l104,0l0,-30"
            style="fill:none;stroke-opacity:0;stroke-width:16.67px;"
          />
          <path
            d="M106.583,93.333l67.5,0l-19.5,-19.5l19.5,19.5l-19.5,19.5l19.5,-19.5l-67.5,0Z"
            style="fill:#fff;stroke-width:16.67px;"
          />
        </svg>
      </form>
      <div class="admin-navigator-link">
        <a
          class="admin-version"
          href="https://github.com/Ericarthurc/ericarthurc.com"
          target="_blank"
        >
          {version}
        </a>
      </div>
    </>
  );
};

export default Navigator;
