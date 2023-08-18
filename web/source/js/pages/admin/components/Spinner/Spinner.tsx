import { Component, createEffect, createSignal, onCleanup } from "solid-js";

interface IProps {
  startTime: number;
}

const Spinner: Component<IProps> = (props) => {
  const [show, setShow] = createSignal("");
  const timer = setInterval(() => setShow("show"), props.startTime);
  onCleanup(() => clearInterval(timer));

  return (
    <div class="spinner-container">
      <div class={`spinner ${show()}`}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 167 167"
          version="1.1"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
          <g transform="matrix(1,0,0,1,-16.9299,-16.9299)">
            <g transform="matrix(1,0,0,1,2.5,-2.5)">
              <path
                d="M155.011,53.605C166.228,66.782 173,83.856 173,102.5C173,144.17 139.17,178 97.5,178C55.83,178 22,144.17 22,102.5"
                style="fill:none;stroke-width:15.14px;"
              />
            </g>
            <g transform="matrix(1,0,0,1,2.5,-2.5)">
              <path
                d="M40.165,53.399C54.016,37.243 74.571,27 97.5,27"
                style="fill:none;stroke-width:15.14px;"
              />
            </g>
          </g>
        </svg>
      </div>
      <div class={`spinner-partial ${show()}`}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 166 167"
          version="1.1"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
          <g transform="matrix(1,0,0,1,-17,-16.9299)">
            <g transform="matrix(-0.707107,-0.707107,0.707107,-0.707107,96.4793,241.407)">
              <path
                d="M158.038,147.6C145.956,163.785 127.542,174.97 106.48,177.471C103.535,177.82 100.538,178 97.5,178C91.828,178 86.302,177.373 80.986,176.185"
                style="fill:none;stroke-width:15.14px;"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
