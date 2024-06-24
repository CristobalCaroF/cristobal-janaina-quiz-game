import Link from "next/link";
import Image from "next/image";
import userIcon from "/public/userIcon.svg";
import userIconDark from "/public/userIcon-white.svg";
import highscoreIcon from "/public/highscore.svg";
import highscoreIconDark from "/public/highscore-white.svg";
import homeIconLight from "/public/home-black.png";
import homeIconDark from "/public/home-white.png";
import styled from "styled-components";
import { useTheme } from "next-themes";

const NavBar = styled.nav`
  align-items: center;
  background: linear-gradient(75deg, transparent, orange, transparent);
  display: flex;
  height: 75px;
  justify-content: space-between;
  left: 0px;
  padding-left: 16px;
  padding-right: 16px;
  position: fixed;
  right: 0px;
  top: 0px;
`;

const Text = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const Title = styled.h1`
  font-size: 38px;
  margin: 0px;
  @media (max-width: 450px) {
    font-size: 22px;
  }
`;

const Subtitle = styled.p`
  font-size: 10px;
  margin: 0px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-top: 3px;
`;

export default function Nav({
  title,
  username,
  showHighscore,
  showProfile,
  showHome,
}) {
  const { theme } = useTheme();
  return (
    <NavBar>
      <Text>
        <Title>{title ?? "TV Quiz Game"}</Title>
        {username && <Subtitle>Welcome {username}</Subtitle>}
      </Text>
      <Buttons>
        {showHighscore && (
          <Link href="/highscores">
            <Image
              priority
              src={theme === "dark" ? highscoreIconDark : highscoreIcon}
              alt="highscores"
              width={29}
              height={29}
            />
          </Link>
        )}
        {showProfile && (
          <Link href="/profile">
            <Image
              priority
              src={theme === "dark" ? userIconDark : userIcon}
              alt="profile"
              width={30}
              height={30}
            />
          </Link>
        )}
        {showHome && (
          <Link href="/">
            <Image
              width={30}
              height={30}
              src={theme === "dark" ? homeIconDark : homeIconLight}
              alt="home-page"
            />
          </Link>
        )}
      </Buttons>
    </NavBar>
  );
}
