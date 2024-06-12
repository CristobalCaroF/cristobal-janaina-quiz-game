import LoginButton from "./LoginButton";

export default function ProfileInfo({ session }) {
  return (
    <div>
      <h1>Hello {session.user?.name}</h1>
      <p>You are signed in as {session.user?.email}</p>
      <LoginButton />
    </div>
  );
}
