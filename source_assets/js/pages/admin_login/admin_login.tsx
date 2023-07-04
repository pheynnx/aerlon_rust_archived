import { Component, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import axios from "axios";
import { MountableElement, render } from "solid-js/web";

// import "~/styles/admin-login.scss";

const Main = () => {
  const [formData, setFormData] = createStore({
    password: "",
    pin: "",
  });

  const [formStatus, setFormStatus] = createStore<{
    message: string;
    hidder: "hide" | "show";
  }>({
    message: "test",
    hidder: "hide",
  });

  const formHandler = async (e: Event) => {
    e.preventDefault();

    try {
      await axios.post(
        "/admin/login",
        { password: formData.password, pin: formData.pin },
        { headers: { "Content-Type": "application/json" } }
      );

      location.href = "/admin";
    } catch (error) {
      setFormStatus("hidder", "show");
      setFormStatus("message", "Invalid login credentials");
    }
  };

  return (
    <main class="admin-login-container">
      <div class="admin-login-status-container">
        <div class={`admin-login-status ${formStatus.hidder}`}>
          <span class="admin-login-status-message">{formStatus.message}</span>
        </div>
      </div>
      <div class="admin-login-div">
        <form class="admin-login-form" onSubmit={formHandler}>
          <label class="admin-login-label" for="password">
            Password
          </label>
          <input
            class="admin-login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData("password", e.currentTarget.value)}
          />
          <label class="admin-login-label" for="pin">
            Pin
          </label>
          <input
            class="admin-login-input"
            type="password"
            name="pin"
            value={formData.pin}
            onChange={(e) => setFormData("pin", e.currentTarget.value)}
          />
          <button class="admin-login-submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

render(Main, document.getElementById("root") as MountableElement);
