import Nav from "@/components/Nav";
import ProfileInfo from "@/components/ProfileInfo";
import SignIn from "@/components/SignIn";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Router, { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

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
        <button type="button " onClick={() => router.push("/quiz")}>
          PLAY
        </button>
      </div>
    </>
  );
}
