import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import homeIcon from "/public/home-black.png";
import HighScoresTable from "@/components/HighScoresTable";

const Table = styled.table`
  display: flex;
  justify-content: center;
`;

export default function HighScores() {
  const [selectedQuiz, setSelectedQuiz] = useState("All");
  const [selectedQuizId, setSelectedQuizId] = useState();
  const [quizData, setQuizData] = useState();
  const router = useRouter();
  const {
    data: highScoresData,
    error,
    isLoading,
  } = useSWR(`/api/highscores${selectedQuizId ? "/" + selectedQuizId : ""}`);

  const initializeData = async () => {
    const response = await fetch("/api/quizzes");
    const data = await response.json();
    setQuizData([{ _id: "", name: "All" }, ...data]);
  };

  useEffect(() => {
    initializeData();
  }, []);

  if (isLoading || error || !highScoresData.length || !quizData?.length)
    return <h1>Loding</h1>;

  function handleQuizName(quizId) {
    const selectedQuiz = quizData.filter((quiz) => {
      return quiz._id === quizId;
    });
    setSelectedQuiz(selectedQuiz[0] ? selectedQuiz[0].name : "All");
  }

  return (
    <div>
      <h1>High Scores</h1>
      <hr />
      <label>
        Select a quiz:
        <select
          onChange={(e) => {
            setSelectedQuizId(e.target.value);
            handleQuizName(e.target.value);
          }}
        >
          {quizData?.map((quiz) => (
            <option value={quiz._id}>{quiz.name}</option>
          ))}
        </select>
      </label>
      <hr />
      <h3>{selectedQuiz}</h3>
      <HighScoresTable scores={highScoresData} />
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
