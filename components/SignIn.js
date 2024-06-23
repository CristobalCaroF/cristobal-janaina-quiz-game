import Container from "./Container";
import LoginButton from "./LoginButton";
import Nav from "./Nav";

export default function SignIn() {
  return (
    <>
      <Nav />
      <Container>
        <p>
          Welcome to the amazing TV Quiz Game presented to you by Janaína and
          Critobal from the Caraway class of Spiced Academy
        </p>
        <p>
          You will have fun answering questions about your favorite TV shows and
          competing with your friends for a place in the top 10 highscorers.
        </p>
        <p>To start playing, please sign in.</p>
        <LoginButton />
      </Container>
    </>
  );
}
