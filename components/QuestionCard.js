import useSWR from "swr";
import { useEffect, useState } from "react";
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
    <>
      <article>
        <h4>{question.question}</h4>
        <ul>
          {question.answers.map((answer, index) => {
            return (
              <li key={index}>
                <input type="radio" value={answer} />
                {answer}
              </li>
            );
            // return <option>{answer}</option>;
          })}
        </ul>
      </article>
    </>
  );
}
