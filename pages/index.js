// import Image from "next/image";
// import styled from "styled-components";
// import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function Home() {
  const { data } = useSWR("/api/questions", fetcher);

  if (!data) return null;
  return (
    <>
      <ul>
        {data.map((question) => {
          return (
            <li key={question._id}>
              {question.question} {question.correct}
            </li>
          );
        })}
      </ul>
    </>
  );
}
