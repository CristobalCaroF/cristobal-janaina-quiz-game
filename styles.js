import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, 
  *::before,
  *::after {
    box-sizing: border-box;
  }

 

  body {
    
    height: 100vh; /* Garante que o body cubra a altura total da viewport */
    width: 100vw;
    
      margin: 0;
      font-family: system-ui;
      padding: 2rem;
      background-color: rgb(242, 140, 6);
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
