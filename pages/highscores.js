import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import homeIcon from "/public/home-black.png";
import HighScoresTable from "@/components/HighScoresTable";
import Scores from "@/db/models/Scores";
import dbConnect from "@/db/dbConnect";
import Quiz from "@/db/models/Quiz";
import Nav from "@/components/Nav";
import Container from "@/components/Container";

const Table = styled.table`
  display: flex;
  justify-content: center;
`;

export async function getServerSideProps(context) {
  let filter = {};
  if (context.query.quizId) {
    filter = { quiz: context.query.quizId };
  }

  await dbConnect();

  let scores = await Scores.find(filter)
    .sort({ score: -1 })
    .limit(10)
    .populate("user")
    .populate("quiz")
    .lean();

  let quizzes = await Quiz.find();

  return {
    props: {
      scores: scores.map((score) => {
        return {
          date: score.date,
          score: score.score,
          user: score.user.gitUsername,
          quiz: score.quiz.name,
        };
      }),
      quizzes: quizzes.map((quiz) => {
        return {
          _id: quiz._id.toString(),
          name: quiz.name,
        };
      }),
    },
  };
}

export default function HighScores({ scores, quizzes }) {
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const router = useRouter();

  function handleQuizFilter(quizId) {
    setSelectedQuiz(quizId);
    router.push(`/highscores?quizId=${quizId}`);
  }

  return (
    <>
      <Nav title="Highscores" showHome={true} />
      <Container>
        Quiz:
        <select
          onChange={(e) => {
            handleQuizFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          {quizzes?.map((quiz) => (
            <option key={quiz._id} value={quiz._id}>
              {quiz.name}
            </option>
          ))}
        </select>
        <hr />
        {scores.length > 0 ? (
          <HighScoresTable scores={scores} showQuizName={selectedQuiz === ""} />
        ) : (
          <p style={{ color: "#333" }}>No scores found</p>
        )}
      </Container>
    </>
  );
}
