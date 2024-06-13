import { useSession } from "next-auth/react";
import SignIn from "./SignIn";
import ProfileInfo from "./ProfileInfo";

export default function Profile() {
  const { data: session } = useSession();

  return <div>{session ? <ProfileInfo session={session} /> : <SignIn />}</div>;
}
