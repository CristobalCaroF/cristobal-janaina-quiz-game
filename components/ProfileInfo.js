import styled from "styled-components";

const Section = styled.section`
  display: block;
  text-align: center;
`;

const Headline = styled.h1`
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(75deg, transparent, orange, transparent);
  padding: 20px;
  border-radius: 8px;
  position: relative;
`;

export default function ProfileInfo({ session }) {
  if (!session) {
    return <></>;
  }
  return (
    <Section>
      <Headline style={{ fontSize: "36px" }}>TV SHOW GAME</Headline>
      {/* <h1>Hello {session.user?.name}</h1> */}
    </Section>
  );
}
