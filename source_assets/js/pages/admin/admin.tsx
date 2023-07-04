import {
  Component,
  createSignal,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { MountableElement, render } from "solid-js/web";
import axios from "axios";

import Updater from "./modules/Updater";
import Creator from "./modules/Creator";
import { IPost } from "./api/types";

import PostPanel from "./modules/PostPanel";
import { createStore } from "solid-js/store";
import Navigator from "./modules/Navigator";
import Metrics from "./metrics/Metrics";

const MODEWIDTH = 750;

const Main = () => {
  const [posts, setPosts] = createSignal<IPost[]>([]);

  const [rect, setRect] = createSignal({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [adminState, setAdminState] = createStore<{
    posts: boolean;
    metrics: boolean;
    editor: boolean;
    editorContent: {
      creator: boolean;
      editorPost: IPost;
    };
  }>({
    posts: true,
    metrics: false,
    editor: false,
    editorContent: { creator: false, editorPost: null },
  });

  const handler = (_: Event) => {
    setRect({ height: window.innerHeight, width: window.innerWidth });
    if (window.innerWidth <= MODEWIDTH) {
      if (adminState.editor) {
        setAdminState({ posts: false });
      }
    }
    if (window.innerWidth >= MODEWIDTH) {
      setAdminState({ posts: true });
    }
  };

  onMount(async () => {
    window.addEventListener("resize", handler);
    try {
      await fetchPostsHandler();
    } catch (error) {}
  });

  onCleanup(() => {
    window.removeEventListener("resize", handler);
  });

  const fetchPostsHandler = async () => {
    const response = await axios.get("/admin/api/post");

    // sorting by date, should also probably sort alphabetically if date is the same
    response.data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setPosts(response.data);
  };

  const editorUpdatePostSelector = (post: IPost) => () => {
    setAdminState({
      editor: true,
      posts: true,
      metrics: false,
      editorContent: { creator: false, editorPost: post },
    });
    if (window.innerWidth <= MODEWIDTH) {
      if (adminState.editor) {
        setAdminState({ posts: false });
      }
    }
  };

  const editorCreateSelector = () => {
    setAdminState({
      editor: true,
      posts: true,
      metrics: false,
      editorContent: { creator: true, editorPost: null },
    });
    if (window.innerWidth <= MODEWIDTH) {
      if (adminState.editor) {
        setAdminState({ posts: false });
      }
    }
  };

  return (
    <main>
      <div>
        <div class="admin-console">
          <div class="admin-navigator">
            <Navigator
              editorCreateSelector={editorCreateSelector}
              setAdminState={setAdminState}
            />
          </div>
          <Switch>
            <Match when={!adminState.metrics}>
              <div
                class={`admin-panel ${
                  rect().width >= MODEWIDTH &&
                  adminState.editor &&
                  adminState.posts
                    ? "multi-mode"
                    : "single-mode"
                }`}
              >
                <Show when={adminState.posts}>
                  <PostPanel
                    posts={posts()}
                    adminState={adminState}
                    editorUpdatePostSelector={editorUpdatePostSelector}
                  />
                </Show>
                <Show when={adminState.editor}>
                  <div class="admin-panel-editor">
                    <Switch>
                      <Match when={adminState.editorContent.editorPost}>
                        <Updater
                          adminState={adminState}
                          fetchPostsHandler={fetchPostsHandler}
                        />
                      </Match>
                      <Match when={adminState.editorContent.creator}>
                        <Creator fetchPostsHandler={fetchPostsHandler} />
                      </Match>
                    </Switch>
                  </div>
                </Show>
              </div>
            </Match>
            <Match when={adminState.metrics}>
              <Metrics></Metrics>
            </Match>
          </Switch>
        </div>
      </div>
    </main>
  );
};

render(Main, document.getElementById("root") as MountableElement);
