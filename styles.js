import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, 
  *::before,
  *::after {
    box-sizing: border-box;
  }

 

  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    font-family: system-ui;
    padding: 2rem;
    background-color: rgba(87, 39, 232, 0.656);
    display:flex;
    justify-content: center;
    text-align: center;
  
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
