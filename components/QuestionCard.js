import { Grid } from "@mui/material";
// import Link from "next/link.js";
// import styled from "styled-components";
// import { StyledImage } from "./StyledImage.js";

// const Article = styled.article`
//   border: 5px solid black;
//   border-radius: 0.8rem;
//   padding: 0.5rem;
// `;

export default function Card({ question }) {
  function handleCheck(answer) {
    setSelected(answer);
    if (answer === question.correct) setCorrect(correct + 1);
  }

  return (
    <article>
      <h4>{question.question}</h4>
      <Grid container>
        {question.answers.map((answer, index) => (
          <Grid item xs={12} sm={6}>
            <input type="radio" value={answer} />
            {answer}
          </Grid>
        ))}
      </Grid>
    </article>
  );
}
