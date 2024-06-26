import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Instructions from "@/components/Instructions";
import dbConnect from "@/db/dbConnect";
import QuizModel from "@/db/models/Quiz";
import Question from "@/db/models/Questions";
import Nav from "@/components/Nav";
import Container, { Box, Center } from "@/components/Container";
import { useTheme } from "next-themes";

const CardBox = styled.div`
  background: transparent;
  border: 2px solid orange;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-itemns: center;
  padding: 20px 30px;
  color: #666;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 3px 3px rgba(0, 0.5, 0.5, 0.4);

  h2 {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    alignt-items: start;
    padding: 10px 0;
    margin-bottom: 20px;
    border-bottom: 2px solid orange;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 30px;

    @media (max-width: 450px) {
      font-size: 14px;
    }
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
    position: absolute;
  }
`;

const Answers = styled.li`
  background-color: ${(props) =>
    props.isSelected ? (props.isCorrect ? "#7ce6b5" : "#ee5c5c") : "white"};
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 10px;
  font-size: 17px;
  margin: 10px;
  cursor: pointer;
  ${(props) =>
    !props.disabled
      ? `
  &:hover {
    
    box-shadow: 3px 3px 3px 3px rgba(0, 0.5, 0.5, 0.4);
    transition: 0.2s;
    opacity: 1.0;`
      : ""};
  }
  
  @media (max-width: 450px) {
    font-size: 14px;
  }
`;

const Title = styled.h1`
  color: #333;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  position: relative;
`;

const SectionResult = styled.section`
  width: 400px; /* Largura fixa */
  height: 600px; /* Altura fixa */
  background: transparent;
  border: 2px solid orange;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-itemns: center;
  padding: 20px 30px;
  color: #666;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 3px 3px rgba(0, 0.5, 0.5, 0.4);

  h3 {
    font-size: 15px;
    display: flex;
    justify-content: center;
    alignt-items: center;
    padding: 10px 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
  }
`;

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

  const onAnswerSelected = (answer) => {
    if (answers[activeQuestion] !== undefined) {
      return;
    }
    const currentAnswer = [...answers, answer];
    setAnswers(currentAnswer);

    if (activeQuestion + 1 === questions.length) {
      setIsRunning(false);
    }

    setTimeout(() => {
      if (activeQuestion + 1 < questions.length) {
        setActiveQuestion(activeQuestion + 1);
      } else {
        addScore(currentAnswer);
        setShowResult(true);
      }
    }, 600);
  };

  async function addScore(answers) {
    const today = new Date();
    const finalDate = today.toISOString().split("T")[0];

    await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: session.user.userId,
        score: score(answers),
        date: finalDate,
        quizId: quizId,
      }),
    });
  }

  const score = (answers) => {
    return Math.max(countCorrectAnswers(answers) * 1000 - time * 10, 0);
  };

  const countCorrectAnswers = (answers) => {
    return questions
      .map((question) => question.correct)
      .filter((correctAnswer, idx) => answers[idx] === correctAnswer).length;
  };

  const handleButtonPlay = () => {
    setShowInstructions(false);
    setIsRunning(true);
  };

  return (
    <>
      <Nav title={`${quiz} Quiz`} showHome={true} />
      <Container>
        {showInstructions && <Instructions onClick={handleButtonPlay} />}
        {!showInstructions && !showResult && (
          <Box>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>
                {activeQuestion + 1}/{questions.length}
              </h2>
              <h2>
                <span> {formatTime(time)}</span>
              </h2>
            </div>

            <h3>{questions[activeQuestion].question}</h3>

            {questions[activeQuestion].answers.map((answer, idx) => (
              <Answers
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                isSelected={answers[activeQuestion] === answer}
                isCorrect={answer === questions[activeQuestion].correct}
                style={{ listStyleType: "none" }}
              >
                <li style={{ listStyleType: "none" }}>{answer}</li>
              </Answers>
            ))}
          </Box>
        )}
        {showResult && (
          <Center>
            <Box>
              <div>
                <Title>Results</Title>
              </div>

              <h3>You win {score(answers)} points!</h3>
              <h3 style={{ color: "#7ce6b5" }}>
                Correct: {countCorrectAnswers(answers)}
              </h3>
              <h3 style={{ color: "#ee5c5c" }}>
                Wrong: {questions.length - countCorrectAnswers(answers)}
              </h3>
              <h3>Time: {formatTime(time)}</h3>
            </Box>
          </Center>
        )}
      </Container>
    </>
  );
}
