import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import homeIcon from "/public/home-black.png";
import HighScoresTable from "@/components/HighScoresTable";
import Scores from "@/db/models/Scores";
import dbConnect from "@/db/dbConnect";
import Quiz from "@/db/models/Quiz";

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
    <div>
      <h1>High Scores</h1>
      <hr />
      <label>
        Select a quiz:
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
      </label>
      <hr />
      <h3>{quizzes.find((quiz) => quiz._id === selectedQuiz)?.name}</h3>
      {scores.length > 0 ? (
        <HighScoresTable scores={scores} showQuizName={selectedQuiz === ""} />
      ) : (
        <p style={{ color: "#333" }}>No scores found</p>
      )}
      <div>
        <Link href="/">
          <Image
            width={30}
            height={30}
            priority
            src={homeIcon}
            alt="home-page"
          />
        </Link>
      </div>
    </div>
  );
}
