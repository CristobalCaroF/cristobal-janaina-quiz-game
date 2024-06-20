import Nav from "@/components/Nav";
import ProfileInfo from "@/components/ProfileInfo";
import SignIn from "@/components/SignIn";
import { useSession } from "next-auth/react";

import Router, { useRouter } from "next/router";
import useSWR from "swr";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: quizzes } = useSWR("/api/quizzes");

  // console.log(quizzes);

  if (!session) {
    return <SignIn />;
  }

  return (
    <>
      <ProfileInfo session={session} />
      <div>
        <Nav />
      </div>
      <div>
        {quizzes?.map((quiz) => (
          <a href={`/quiz/${quiz._id}`}>
            <img src={quiz.imageUrl} alt={quiz.name} width={450} height={300} />
          </a>
        ))}
      </div>

      {/* <div>
        <button type="button " onClick={() => router.push("/quiz")}>
          PLAY
        </button>
      </div> */}
      <div>
        <button type="button " onClick={() => router.push("/highscores")}>
          HIGHSCORES
        </button>
      </div>
    </>
  );
}

// export async function getServerSideProps() {
// await dbConnect();
// const quizzes = await Quiz.find().lean();
// return {
//   props: {
//     quizzes: quizzes.map((quiz) => ({ ...quiz, _id: quiz._id.toString() })),
//   },
// };
//   return { props: {} };
// }
