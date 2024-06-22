import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

  *, 
  *::before,
  *::after {
    box-sizing: border-box;
  }


  body {
    
    height: 100vh; /* Garante que o body cubra a altura total da viewport */
    width: 100vw;
    margin: 0;
    font-family: "Montserrat", "DM Sans", verdana, sans-serif;
    padding: 2rem;
    background-color: white;
    display:flex;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    
  
  }


:root {
  /* Your default theme */
  --background: white;
  --foreground: black;
}

[data-theme='dark'] {
  --background: black;
  --foreground: white;
}

`;

// :root {
//     --primary-color: #22babb;
//     --secondary-color: #f24405;
//     --primary-background: #d3d3d3;
//   }
