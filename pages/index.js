import Nav from "@/components/Nav";
import ProfileInfo from "@/components/ProfileInfo";
import SignIn from "@/components/SignIn";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <SignIn />;
  }

  return (
    <>
      <ProfileInfo session={session} />
      <div>
        <Nav />
      </div>
      <div>
        <Image
          src="/Friends1.png"
          alt="friends-foto"
          width={200}
          height={100}
        />
      </div>

      <div>
        <button type="button ">PLAY</button>
      </div>
    </>
  );
}
