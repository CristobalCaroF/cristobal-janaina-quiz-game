import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(args).then((res) => res.json());

function useRandomQuestions() {
  const { data, error, isLoading } = useSWR("/api/questions", fetcher);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const selectedQuestions = [];

    if (data) {
      for (let i = 0; i < 10; i++) {
        let idx = Math.floor(Math.random() * data.length);
        selectedQuestions.push(data[idx]);
        data.splice(idx, 1);
      }

      setQuestions(selectedQuestions);
    }
  }, [data]);

  return {
    questions,
    error,
    isLoading,
  };
}

export default useRandomQuestions;
