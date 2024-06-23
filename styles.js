import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

  // * , 
  // *::before,
  // *::after {
  //   // box-sizing: border-box;
  // }


  body {
    height: 100%; /* Garante que o body cubra a altura total da viewport */
    width: 100%;
    // max-width: 768px;
    font-family: "Montserrat", "DM Sans", verdana, sans-serif;
    background-color: --background;
    text-align: center;
    text-decoration: none;
    margin: 0px;
  }


:root {
  /* Your default theme */
  --background: white;
  --foreground: black;
}

[data-theme='dark'] {
  --background: #0a0b2a;
  --foreground: white;
}

`;
