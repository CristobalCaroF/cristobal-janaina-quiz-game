import Link from "next/link";
import LoginButton from "./LoginButton";

export default function Login() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const registerData = Object.fromEntries(formData);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
  }

  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            id="user-input"
            name="username"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            // value={password}
            // onChange={handleChange}
            // pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
            // title="Must contain at least one letter, one number, and be at least 8 characters long"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <LoginButton />
      </form>
      <Link href="/register">Register here</Link>
    </>
  );
}
