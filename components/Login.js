import Link from "next/link";

export default function Login() {
  return (
    <>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link href="/register">Register here</Link>
    </>
  );
}
