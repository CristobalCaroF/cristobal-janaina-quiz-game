import useSWR from "swr";
import { useRouter } from "next/router";

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
      <p> User name | Score | Date</p>
      <ul>
        {data.map((score) => {
          return (
            <li key={score._id}>
              {score.username} | {score.score} | {score.date}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
