import styled from "styled-components";

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
      <h1 style={{ fontSize: "36px" }}>TV SHOW QUIZ</h1>
      {/* <h1>Hello {session.user?.name}</h1> */}
    </Section>
  );
}
