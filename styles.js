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
    background-color: rgb(151, 108, 192);
    
  }
`;

// :root {
//     --primary-color: #22babb;
//     --secondary-color: #f24405;
//     --primary-background: #d3d3d3;
//   }
