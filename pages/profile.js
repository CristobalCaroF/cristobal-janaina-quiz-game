import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
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
  border: 1px solid orange;
`;

const IconHome = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1000;
  color: white;
`;

// async function uploadFile(urlPath, { arg }) {
//   await fetch(urlPath.join(""), {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       avatar: arg,
//     }),
//   });
// }

const fetcher = (urlPath) => fetch(urlPath.join("")).then((res) => res.json());
const hasAvatarFetcher = (urlPath) =>
  fetch(urlPath.join("")).then((res) => res.status === 200);

export default function ProfilePage() {
  const { data: session } = useSession();
  const [avatarImage, setAvatarImage] = useState();
  const { data: hasAvatar, mutate } = useSWR(
    ["/api/profile/", session?.user?.userId, "/avatar"],
    hasAvatarFetcher
  );
  // const { trigger } = useSWRMutation(
  //   ["/api/profile/", session?.user?.userId, "/avatar"],
  //   uploadFile
  // );
  const router = useRouter();

  const [refreshKey, setRefreshKey] = useState(Date.now());
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
      image: Buffer.from(await file.arrayBuffer()).toString("base64"),
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
    // trigger(avatarImage);

    await fetch(`/api/profile/${session?.user?.userId}/avatar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatarImage),
    });
    setTimeout(() => {
      mutate();
      setRefreshKey(Date.now());
    }, 1000);
    formElement.reset();
  }

  const handleDelete = async () => {
    await fetch(`/api/profile/${session?.user?.userId}/avatar`, {
      method: "DELETE",
    });
    setTimeout(() => {
      mutate();
      setRefreshKey(Date.now());
    }, 1000);
  };

  return (
    <>
      <div className="header-container">
        <h1 style={{ color: "#333" }}>Profile</h1>
      </div>
      <StyledImage
        src={`/api/profile/${session.user?.userId}/avatar`}
        loader={(params) =>
          `${params.src}?github=${session.user?.image}&refreshKey=${refreshKey}`
        }
        key={refreshKey}
        alt="User Avatar"
        width={100}
        height={100}
      />
      <PictureForm
        handleSubmit={handleSubmit}
        handleChangeAvatar={handleChangeAvatar}
        showDelete={hasAvatar}
        onDelete={handleDelete}
      />
      <ScoresTable scores={scores} />

      <DarkModeToggle />
      <IconHome>
        <Link href="/">
          <Image priority src={homeIcon} alt="home-page" />
        </Link>
      </IconHome>
    </>
  );
}
