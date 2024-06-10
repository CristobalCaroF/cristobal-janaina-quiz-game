import Link from "next/link";

export default function Login() {
  return (
    <>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value="" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value="" />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link href="/">Register here</Link>
    </>
  );
}
