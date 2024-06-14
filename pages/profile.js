import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import DarkModeToggle from "@/components/DarkModeToggle";

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

      <DarkModeToggle />
    </>
  );
}
