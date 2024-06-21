import styled from "styled-components";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link.js";
import useRandomQuestions from "@/utils/useRandomQuestions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Instructions from "@/components/Instructions";
import dbConnect from "@/db/dbConnect";
import QuizModel from "@/db/models/Quiz";
import Question from "@/db/models/Questions";

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
  border-radius: 15px;
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

const fetcher = (url) => fetch(url).then((res) => res.json());

function shuffle(array) {
  // Fisher Yates algorithm
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export async function getServerSideProps(context) {
  const { quizId } = context.query;

  await dbConnect();
  const quiz = await QuizModel.findOne({ _id: quizId });
  const questions = await Question.aggregate([
    { $match: { quizId: quizId } },
  ]).sample(10);
  return {
    props: {
      quiz: quiz.name,
      questions: questions.map((question) => ({
        question: question.question,
        answers: shuffle(question.answers),
        correct: question.correct,
      })),
    },
  };
}

export default function Quiz({ questions, quiz }) {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const [showResult, setShowResult] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(0); // Estado para armazenar o tempo em segundos
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Incrementa o tempo a cada segundo
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval); // Limpa o intervalo se o cronômetro não estiver rodando
    }

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [isRunning, time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const router = useRouter();
  const { quizId } = router.query;
  const { data: session } = useSession();

  // const { data, error, isLoading, mutate } = useSWR(
  //   `/api/questions/${quizId}`,
  //   fetcher
  // );

  // useEffect(() => {
  //   const selectedQuestions = [];

  //   if (data) {
  //     for (let i = 0; i < 10; i++) {
  //       let idx = Math.floor(Math.random() * data.length);
  //       selectedQuestions.push(data[idx]);
  //       data.splice(idx, 1);
  //     }
  //     for (let question of selectedQuestions) {
  //       for (let i = question.answers.length - 1; i > 0; i--) {
  //         const j = Math.floor(Math.random() * (i + 1));
  //         [question.answers[i], question.answers[j]] = [
  //           question.answers[j],
  //           question.answers[i],
  //         ];
  //       }
  //     }
  //     setQuestions(selectedQuestions);
  //   }
  // }, [data]);

  // if (isLoading || error || !questions.length) return null;

  const onAnswerSelected = (answer) => {
    if (answers[activeQuestion] !== undefined) {
      return;
    }
    setAnswers([...answers, answer]);

    if (activeQuestion + 1 === questions.length) {
      setIsRunning(false);
    }

    setTimeout(() => {
      if (activeQuestion + 1 < questions.length) {
        setActiveQuestion(activeQuestion + 1);
      } else {
        addScore();
        setShowResult(true);
      }
    }, 600);
  };

  async function addScore() {
    const today = new Date();
    const finalDate = today.toISOString().split("T")[0];

    await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.name,
        score: score(),
        date: finalDate,
        quizId: quizId,
      }),
    });

    // if (response.ok) {
    //   mutate();
    // }
  }

  const score = () => {
    return Math.max(countCorrectAnswers() * 1000 - time * 10, 0);
  };

  const countCorrectAnswers = () => {
    return questions
      .map((question) => question.correct)
      .filter((correctAnswer, idx) => answers[idx] === correctAnswer).length;
  };

  const handleButtonPlay = () => {
    setShowInstructions(false);
    setIsRunning(true);
  };

  return (
    <div>
      <section>
        {showInstructions && <Instructions onClick={handleButtonPlay} />}
        {/* <QuizCard title={questions[activeQuestion].question} /> */}
        {!showInstructions && !showResult && (
          <CardBox>
            <Title>{quiz} Quiz</Title>
            <div>
              <h2>
                <span>
                  {activeQuestion + 1}/{questions.length}
                </span>
              </h2>
              <h2>
                <span>Timer: {formatTime(time)}</span>
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
        )}
        {showResult && (
          // <Results result={result} />
          <div>
            <h3>Results</h3>
            <h3>Score: {score()}</h3>
            <h3>Correct: {countCorrectAnswers()}</h3>
            <h3>Wrong: {questions.length - countCorrectAnswers()}</h3>
            <h3>Time: {formatTime(time)}</h3>
          </div>
        )}
      </section>

      <button type="button" onClick={() => router.back()}>
        Quit quiz
      </button>
    </div>
  );
}
