import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import DarkModeToggle from "@/components/DarkModeToggle";
import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";

const Table = styled.table`
  display: flex;
  justify-content: center;
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

export default function ProfilePage() {
  const { data: session } = useSession();
  const [avatarImage, setAvatarImage] = useState();

  const { trigger } = useSWRMutation(
    ["/api/profile/", session?.user?.name, "/avatar"],
    uploadFile
  );
  const router = useRouter();

  const { data: scores } = useSWR([
    "/api/profile/",
    session?.user?.name,
    "/score",
  ]);
  console.log(scores);

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
      <h1>Profile</h1>
      <div>
        <button type="button" onClick={() => router.back()}>
          Home
        </button>
      </div>
      <Image
        // src={`/api/profile/${session.user?.name}/avatar`}
        src={session.user?.image}
        alt="User Avatar"
        width={100}
        height={100}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">File</label>
        <input type="file" name="file" onChange={handleChangeAvatar} />
        <button>Upload</button>
      </form>

      <h2>History:</h2>

      <Table>
        <tr>
          <td>Date</td>
          <td>Score</td>
          <td>Quiz</td>
          <br />
          {scores?.map((score) => {
            return (
              <>
                <td>{score.date}</td>
                <td>{score.score}</td>
                <td>{score.quiz.name}</td>
                <br />
              </>
            );
          })}
        </tr>
      </Table>

      <DarkModeToggle />
    </>
  );
}
