import styled from "styled-components";

import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link.js";
import useRandomQuestions from "@/utils/useRandomQuestions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const CardBox = styled.div`
  position: relative;
  widht: 500px;
  background: transparent;
  border: 2px solid #c40094;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;

  h2 {
    font-size: 15px;
    display: flex;
    alignt-items: start;
    padding: 20px 0;
    border-bottom: 2px solid #c40094;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
  }

  ul {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    font-size: 17px;
    text-decoration: none;
    margin: 10px 0;
    cursor: pointer;
  }
`;

const Answers = styled.li`
  background-color: ${(props) =>
    props.isSelected ? (props.isCorrect ? "green" : "red") : "white"};
  color: "black";
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  ${(props) =>
    !props.disabled
      ? `
  &:hover {
    background-color: "green";
    border-color: rgba(255, 255, 255, 0.1);`
      : ``}
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
  background: linear-gradient(45deg, transparent, #c40094, transparent);
`;

const Buttonnext = styled.button`
  width: 100px;
  height: 45px;
  background: transparent;
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 600;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background: #950170;
    border-color: #950170;
  }
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  // const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    score: 0,
  });
  const router = useRouter();
  const { quizId } = router.query;
  const { data: session } = useSession();

  const { data, error, isLoading, mutate } = useSWR(
    `/api/questions/${quizId}`,
    fetcher
  );
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const selectedQuestions = [];

    if (data) {
      for (let i = 0; i < 10; i++) {
        let idx = Math.floor(Math.random() * data.length);
        selectedQuestions.push(data[idx]);
        data.splice(idx, 1);
      }
      for (let question of selectedQuestions) {
        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [
            question.answers[j],
            question.answers[i],
          ];
        }
      }
      setQuestions(selectedQuestions);
    }
  }, [data]);

  if (isLoading || error || !questions.length) return null;

  const onAnswerSelected = (answer) => {
    if (answers[activeQuestion] !== undefined) {
      return;
    }
    setAnswers([...answers, answer]);

    setTimeout(() => {
      if (activeQuestion + 1 < questions.length) {
        setActiveQuestion(activeQuestion + 1);
      } else {
        addScore();
        setShowResult(true);
      }
    }, 800);

    // setChecked(true);
    // setSelectedAnswer(answer);
  };
  //   if (answer === questions[activeQuestion].correct) {
  //     setSelectedAnswer(true);
  //   } else {
  //     setSelectedAnswer(false);
  //   }
  // };

  async function addScore() {
    const today = new Date();
    const finalDate = today.toISOString().split("T")[0];
    const response = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.name,
        score: countCorrectAnswers(),
        date: finalDate,
        quizId: quizId,
      }),
    });

    // if (response.ok) {
    //   mutate();
    // }
  }

  // const nextQuestion = () => {
  //   setResult((prev) =>
  //     selectedAnswer
  //       ? {
  //           ...prev,
  //           score: prev.score + 1,
  //           correctAnswers: prev.correctAnswers + 1,
  //         }
  //       : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
  //   );
  //   if (activeQuestion !== questions.length - 1) {
  //     setActiveQuestion((prev) => prev + 1);
  //   } else {
  //     setActiveQuestion(0);
  //     setShowResult(true);
  //     addScore(result);
  //   }
  //   // setChecked(false);
  // };

  const countCorrectAnswers = () => {
    return questions
      .map((question) => question.correct)
      .filter((correctAnswer, idx) => answers[idx] === correctAnswer).length;
  };

  return (
    <div>
      <Title>Friends Quiz</Title>
      <button type="button" onClick={() => router.back()}>
        Quit quiz
      </button>

      <section>
        {/* <QuizCard title={questions[activeQuestion].question} /> */}
        {!showResult ? (
          <CardBox>
            <div>
              <h2>
                Question: {activeQuestion + 1}
                <span>/{questions.length}</span>
              </h2>
            </div>

            <h3>{questions[activeQuestion].question}</h3>

            {questions[activeQuestion].answers.map((answer, idx) => (
              <Answers
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                isSelected={answers[activeQuestion] === answer}
                // disabled={selectedAnswer !== null}
                isCorrect={answer === questions[activeQuestion].correct}
                style={{ listStyleType: "none" }}
              >
                <li style={{ listStyleType: "none" }}>{answer}</li>
              </Answers>
            ))}

            {/* {checked ? (
              <Buttonnext onClick={nextQuestion}>
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Buttonnext>
            ) : (
              <Buttonnext disabled>
                {" "}
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Buttonnext>
            )} */}
          </CardBox>
        ) : (
          // <Results result={result} />
          <div>
            <h3>Results</h3>
            <h3>Score: {countCorrectAnswers() * 1000}</h3>
            <h3>Correct: {countCorrectAnswers()}</h3>
            <h3>Wrong: {questions.length - countCorrectAnswers()}</h3>
          </div>
        )}
      </section>
    </div>
  );
}
