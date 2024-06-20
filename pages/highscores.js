import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
      <button type="button" onClick={() => router.back()}>
        Home
      </button>
      <hr />
      <label>
        Select a quiz:
        <select
          onChange={(e) => {
            setSelectedQuizId(e.target.value);
            handleQuizName(e.target.value);
            // setSelectedQuiz()
          }}
        >
          {quizData?.map((quiz) => (
            <option value={quiz._id}>{quiz.name}</option>
          ))}
        </select>
      </label>
      <hr />
      <h3>{selectedQuiz}</h3>

      <Table>
        <tr>
          <td>Date</td>
          <td>User</td>
          <td>Score</td>
          <br />
          {highScoresData?.map((score) => {
            return (
              <>
                <td>{score.date}</td>
                <td>{score.userId}</td>
                <td>{score.score}</td>
                <br />
              </>
            );
          })}
        </tr>
      </Table>
    </div>
  );
}
