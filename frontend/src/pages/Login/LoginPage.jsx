import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(username);
      localStorage.setItem("token", token);
      navigate("/homepage");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}
