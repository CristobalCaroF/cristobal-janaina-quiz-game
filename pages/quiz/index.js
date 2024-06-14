// import styled from "styled-components";

import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link.js";
import useRandomQuestions from "@/utils/useRandomQuestions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    score: 0,
  });
  const router = useRouter();
  const { data: session } = useSession();

  const { data, error, isLoading, mutate } = useSWR("/api/questions", fetcher);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const selectedQuestions = [];

    if (data) {
      for (let i = 0; i < 10; i++) {
        let idx = Math.floor(Math.random() * data.length);
        selectedQuestions.push(data[idx]);
        data.splice(idx, 1);
        console.log(data.length);
      }

      setQuestions(selectedQuestions);
    }
  }, [data]);

  if (isLoading || error || !questions.length) return null;

  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    if (answer === questions[activeQuestion].correct) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  async function addScore(result) {
    console.log("stored result");
    const today = new Date();
    const finalDate = today.toISOString().split("T")[0];
    const response = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: session.user.name,
        score: result.score,
        date: finalDate,
      }),
    });

    if (response.ok) {
      mutate();
    }
  }

  const nextQuestion = () => {
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
      addScore(result);
    }
    setChecked(false);
  };

  return (
    <div>
      <h1>Friends Quiz</h1>
      <button type="button" onClick={() => router.back()}>
        Quit quiz
      </button>
      <div>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {/* <QuizCard title={questions[activeQuestion].question} /> */}
        {!showResult ? (
          <div>
            <h3>{questions[activeQuestion].question}</h3>
            {questions[activeQuestion].answers.map((answer, idx) => (
              <li key={idx} onClick={() => onAnswerSelected(answer, idx)}>
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion}>
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            ) : (
              <button disabled>
                {" "}
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        ) : (
          // <Results result={result} />
          <div>
            <h3>Results</h3>
            <h3>Score: {result.score}</h3>
            <h3>Correct: {result.correctAnswers}</h3>
            <h3>Wrong: {result.wrongAnswers}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
