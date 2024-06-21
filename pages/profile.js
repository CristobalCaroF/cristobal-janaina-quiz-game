import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import DarkModeToggle from "@/components/DarkModeToggle";
import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import homeIcon from "/public/home-black.png";
import ScoresTable from "@/components/ScoresTable";
import PictureForm from "@/components/PictureForm";

const StyledImage = styled(Image)`
  box-shadow: 2px 5px 5px rgba(0, 0.5, 0.5, 0.5);
  margin: 10px;
  border-radius: 100%;
`;

const StyledLink = styled(Link)`
  margin: 10px;
`;

async function uploadFile(urlPath, { arg }) {
  await fetch(urlPath.join(""), {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      avatar: arg,
    }),
  });
}

const fetcher = (urlPath) => fetch(urlPath.join("")).then((res) => res.json());

export default function ProfilePage() {
  const { data: session } = useSession();
  const [avatarImage, setAvatarImage] = useState();

  const { trigger } = useSWRMutation(
    ["/api/profile/", session?.user?.userId, "/avatar"],
    uploadFile
  );
  const router = useRouter();

  const { data: scores } = useSWR(
    ["/api/profile/", session?.user?.userId, "/score"],
    fetcher
  );

  if (!session) {
    return;
  }

  async function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarImage({
      image: Buffer.from(await file.arrayBuffer()),
      size: file.size,
      mimeType: file.type,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!avatarImage) {
      return;
    }

    const formElement = event.currentTarget;
    trigger(avatarImage);
    formElement.reset();
  }

  return (
    <>
      <div className="header-container">
        <h1>Profile</h1>
      </div>
      <StyledImage
        src={session.user?.image}
        alt="User Avatar"
        width={100}
        height={100}
      />
      <PictureForm
        handleSubmit={handleSubmit}
        handleChangeAvatar={handleChangeAvatar}
      />
      <ScoresTable scores={scores} />

      <DarkModeToggle />
      <div>
        <Link href="/">
          <Image priority src={homeIcon} alt="home-page" />
        </Link>
      </div>
    </>
  );
}
