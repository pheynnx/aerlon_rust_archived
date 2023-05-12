import { Component, createSignal } from "solid-js";
import { MountableElement, render } from "solid-js/web";

const Main = () => {
  const [rng, setRNG] = createSignal<number>(Math.floor(Math.random() * 101));
  return (
    <div class="rng-container">
      <span class="rng-number">{rng()}</span>
      <button
        class="rng-button"
        onClick={() => {
          setRNG(Math.floor(Math.random() * 101));
        }}
      >
        Generate
      </button>
    </div>
  );
};

render(Main, document.getElementById("root") as MountableElement);
