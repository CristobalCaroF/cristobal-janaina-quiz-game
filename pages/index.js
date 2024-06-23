import Nav from "@/components/Nav";
import ProfileInfo from "@/components/ProfileInfo";
import SignIn from "@/components/SignIn";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import LoginButton from "@/components/LoginButton";

const ImageContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaço entre as imagens */
  width: 80%; /* Ajusta a largura do contêiner */
  max-width: 768px; /* Limite de largura para telas maiores */
  margin: auto;
  padding: 20px;
`;

const Imagens = styled.img`
  width: 100%;
  height: auto; /* Ajusta a altura automaticamente */
  aspect-ratio: 16/9; /* Define uma proporção fixa */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 2px 10px 5px rgba(0, 0.5, 0.5, 0.5);
`;

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: quizzes } = useSWR("/api/quizzes");

  // console.log(quizzes);

  if (!session) {
    return <SignIn />;
  }

  return (
    <>
      {/* <ProfileInfo session={session} /> */}
      {/* <div> */}
      <Nav />
      {/* </div> */}
      <div style={{ marginTop: "120px" }}>
        <ImageContainer>
          {quizzes?.map((quiz) => (
            <a href={`/quiz/${quiz._id}`}>
              <Imagens src={quiz.imageUrl} alt={quiz.name} />
            </a>
          ))}
        </ImageContainer>

        {/* <div>
        <button type="button " onClick={() => router.push("/quiz")}>
          PLAY
        </button>
      </div> */}

        <p style={{ fontSize: "12px" }}>
          You are signed in as {session.user?.email}
        </p>
        <div>
          <LoginButton />
        </div>
      </div>
    </>
  );
}
