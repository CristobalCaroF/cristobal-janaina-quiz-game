import Link from "next/link";
import Image from "next/image";
import userIcon from "/public/userIcon.svg";
import highscoreIcon from "/public/highscore.svg";
import styled from "styled-components";

const NavProfile = styled.nav`
  position: fixed;
  top: 0px;
  // right: 20px;
  width: 100%;
  height: 120px;
  cursor: pointer;
  left: 0;
  z-index: 1000;
  color: white;
  background: linear-gradient(75deg, transparent, orange, transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Headline = styled.h1`
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 20px;
  border-radius: 8px;
  position: relative;
`;

export default function Nav() {
  return (
    <NavProfile>
      <Headline style={{ fontSize: "28px" }}>TV SHOW GAME</Headline>
      <div
        style={{
          alignItems: "center",
          paddingRight: "16px",
          display: "flex",
        }}
      >
        <Link href="/highscores" style={{ marginRight: "16px" }}>
          <Image
            priority
            src={highscoreIcon}
            alt="highscores"
            width={29}
            height={29}
          />
        </Link>
        <Link href="/profile">
          <Image priority src={userIcon} alt="profile" width={30} height={30} />
        </Link>
      </div>
    </NavProfile>
  );
}
