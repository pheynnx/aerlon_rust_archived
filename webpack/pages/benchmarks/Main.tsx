import { createSignal } from "solid-js";
import { render } from "solid-js/web";

const App = () => {
    const [rng, setRng] = createSignal(Math.floor(Math.random() * 101))
    return <div>
        <h3>Test</h3>
        <h5>{rng()}</h5>
        <button onClick={() => setRng(Math.floor(Math.random() * 101))}>Random</button>
    </div>
}

// @ts-ignore
render(App, document.getElementById('root'));