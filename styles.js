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
    background-color: var(--background);
    text-align: center;
    text-decoration: none;
    margin: 0px;
    transition: background-color var(0.3s), color var(0.3s);
  }

  html {
  transition: background-color var(0.3s), color var(0.3s);
}


:root {
  /* Your default theme */
  --background: white;
  --foreground: black;
  --settingsFontColor: #666
}

[data-theme='dark'] {
  --background: #02001c;
  --foreground: white;
  --settingsFontColor: white
}

`;
