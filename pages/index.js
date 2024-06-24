import Nav from "@/components/Nav";
import SignIn from "@/components/SignIn";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styled from "styled-components";
import Container from "@/components/Container";

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px; /* Espaço entre as imagens */
  max-width: 768px; /* Limite de largura para telas maiores */
  // margin: auto;
  padding: 10px;
  // width: 100%;
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
  const { data: quizzes } = useSWR("/api/quizzes");

  if (!session) {
    return <SignIn />;
  }

  return (
    <>
      <Nav
        title="TV Show Game"
        username={session.user?.name}
        showHighscore={true}
        showProfile={true}
      />
      <Container>
        <ImageContainer>
          {quizzes?.map((quiz) => (
            <a href={`/quiz/${quiz._id}`}>
              <Imagens src={quiz.imageUrl} alt={quiz.name} />
            </a>
          ))}
        </ImageContainer>
      </Container>
    </>
  );
}
