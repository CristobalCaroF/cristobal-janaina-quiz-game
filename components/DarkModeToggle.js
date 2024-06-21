import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ButtonDark = styled.button`
  background-color: ${(props) => (props.theme === "light" ? "#ccc" : "#444")};
  border: 2px solid ${(props) => (props.theme === "light" ? "#444" : "#fff")};
  border-radius: 25px;
  cursor: pointer;
  width: 40px;
  height: 20px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  transition:
    background-color 0.3s,
    border-color 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

const Knob = styled.div`
  width: 14px;
  height: 14px;
  background-color: ${(props) => (props.theme === "light" ? "#444" : "#fff")};
  border-radius: 50%;
  position: absolute;
  left: ${(props) => (props.theme === "light" ? "3px" : "calc(100% - 18px)")};
  transition:
    left 0.3s,
    background-color 0.3s;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 12px;
  color: #333;
`;

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ToggleContainer theme={theme}>
      <Label htmlFor="file">
        {theme === "light" ? "Light mode" : "Dark mode"}
      </Label>
      <ButtonDark
        theme={theme}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Knob theme={theme} />
      </ButtonDark>
    </ToggleContainer>
  );
};

// const DarkModeToggle = () => {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <ButtonDark onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
//       {theme === "light" ? "Dark Mode" : "Light Mode"}
//     </ButtonDark>
//   );
// };

export default DarkModeToggle;
