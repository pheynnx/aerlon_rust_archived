import { Component } from "solid-js";
import { createStore } from "solid-js/store";
import axios from "axios";

import "~/styles/admin-login.scss";

const Main: Component = () => {
  const [formData, setFormData] = createStore({
    password: "",
    pin: "",
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
    } catch (error) {}
  };

  return (
    <main class="admin-login-container">
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

export default Main;
