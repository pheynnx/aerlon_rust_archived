import { Component } from "solid-js";
import { createStore } from "solid-js/store";
import axios from "axios";

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
    } catch (error) {
      console.log("LOGIN FAILED", error);
    }
  };

  return (
    <div>
      <form onSubmit={formHandler}>
        <label for="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData("password", e.currentTarget.value)}
        />
        <label for="pin">Pin:</label>
        <input
          type="password"
          name="pin"
          value={formData.pin}
          onChange={(e) => setFormData("pin", e.currentTarget.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Main;
