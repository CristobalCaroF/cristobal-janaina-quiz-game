import Profile from "@/components/Profile";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Profile />
      <Link href="/pages/homepage.js">Aqui</Link>
    </>
  );
}
