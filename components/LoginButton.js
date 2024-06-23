import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { Button } from "./Container";

const ButtonLogin = styled.button`
  color: black;
  border: none;
  background-color: rgb(151, 108, 192);
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: white;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }
  return <Button onClick={() => signIn()}>Sign In</Button>;
}
