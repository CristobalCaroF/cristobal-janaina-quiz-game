import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";

const Table = styled.table`
  display: flex;
  justify-content: center;
`;

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function HighScores() {
  const { data, error, isLoading } = useSWR("/api/highscores", fetcher);
  const router = useRouter();

  if (isLoading || error || !data.length) return null;

  return (
    <div>
      <h1>Friends Quiz</h1>
      <button type="button" onClick={() => router.back()}>
        Home
      </button>
      <h2>High Scores:</h2>
      <Table>
        <tr>
          <td>Date</td>
          <td>User</td>
          <td>Score</td>
          {data?.map((score) => {
            return (
              <tr>
                <td>{score.date}</td>
                <td>{score.userId}</td>
                <td>{score.score}</td>
              </tr>
            );
          })}
        </tr>
      </Table>
    </div>
  );
}
