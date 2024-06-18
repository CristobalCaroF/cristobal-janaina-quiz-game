// import styled from "styled-components";

import Answers from "@/components/Answers";
import { Box, Container, Paper, Slide, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useImmer } from "use-immer";

const NUM_QUESTIONS = 10;

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
  const [answers, setAnswers] = useImmer(Array(NUM_QUESTIONS));
  const [slideDirection, setSlideDirection] = useState("left");

  useEffect(() => {
    const selectedQuestions = [];

    if (data) {
      for (let i = 0; i < NUM_QUESTIONS; i++) {
        let idx = Math.floor(Math.random() * data.length);
        selectedQuestions.push(data[idx]);
        data.splice(idx, 1);
      }
      for (let question of selectedQuestions) {
        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [question.answers[j], question.answers[i]];
        }
      }
      setQuestions(selectedQuestions);
      setAnswers((draft) => {
        draft.fill("", 0, 10);
      });
    }
  }, [data]);

  if (isLoading || error || !questions.length) return null;

  const handleSelectAnswer = (questionIndex, answer) => {
    if (answers[questionIndex].length === 0) {
      setAnswers((draft) => {
        draft[questionIndex] = answer;
      });
      setTimeout(() => {
        setActiveQuestion((prev) => prev + 1);
      }, 500);
    }
  };

  async function addScore(result) {
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

  const handleChangePage = (_e, page) => {
    setSlideDirection(page - 1 > activeQuestion ? "left" : "right");
    setActiveQuestion(page - 1);
  };

  return (
    // <Container maxWidth="xl" sx={{ backgroundColor: "#B798FF" }}>
    <Container maxWidth="xl" disableGutters>
      <h1>Friends Quiz</h1>
      <button type="button" onClick={() => router.back()}>
        Quit quiz
      </button>
      <Paper>
        <Typography variant="h3">{questions[activeQuestion].question}</Typography>
      </Paper>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                {questions.map((question, index) => (
                  <Box
                    key={index}
                    sx={{ width: "100%", height: "100%", display: activeQuestion === index ? "block" : "none" }}
                  >
                    <Slide in={activeQuestion === index} direction={slideDirection}>
                      <Box>
                        <Answers
                          values={question.answers}
                          selectedAnswer={answers[index]}
                          correctAnswer={question.correct}
                          onSelect={(answer) => handleSelectAnswer(index, answer)}
                        />
                      </Box>
                    </Slide>
                  </Box>
                ))}
              </Box>
            </Box>
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
    </Container>
  );
}
