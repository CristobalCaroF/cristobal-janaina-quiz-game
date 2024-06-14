import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ButtonDark = styled.button`
  background-color: white;
  color: var(--text-color);
  border: 2px solid var(--text-color);
  border-radius: 25px;
  padding: 5px 5px;
  cursor: pointer;
  font-size: 0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;

  &:hover {
    background-color: var(--text-color);
    color: var(--background-color);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ButtonDark onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </ButtonDark>
  );
};

export default DarkModeToggle;
