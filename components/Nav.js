import Link from "next/link";
import Image from "next/image";
import userIcon from "/public/userIcon.svg";
import styled from "styled-components";

const NavProfile = styled.nav`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1000;
  color: white;
`;

export default function Nav() {
  return (
    <NavProfile>
      <Link href="#">
        <Image priority src={userIcon} alt="profile" />
      </Link>
    </NavProfile>
  );
}
