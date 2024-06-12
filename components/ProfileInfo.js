import styled from "styled-components";
import LoginButton from "./LoginButton";

const Section = styled.section`
  display: block;
  text-align: center;
`;

export default function ProfileInfo({ session }) {
  if (!session) {
    return <></>;
  }
  return (
    <Section>
      <h1>Hello {session.user?.name}</h1>
      <p>You are signed in as {session.user?.email}</p>
      <div>
        <LoginButton />
      </div>
    </Section>
  );
}
