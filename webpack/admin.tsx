import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import Main from "./Login/Main";

const App = () => {
  return <Main />;
};

// @ts-ignore
render(App, document.getElementById("root"));
