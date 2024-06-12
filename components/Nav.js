import Link from "next/link";
import Image from "next/image";
import userIcon from "/public/userIcon.svg";

export default function Nav() {
  return (
    <nav>
      <Link href="#">
        <Image priority src={userIcon} alt="profile" />
      </Link>
    </nav>
  );
}
