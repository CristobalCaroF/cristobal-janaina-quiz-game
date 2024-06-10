import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

// const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function RegisterForm() {
  const { data } = useSWR("/api/users");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const registerData = Object.fromEntries(formData);

    router.push("/");

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    if (!data) {
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-input">Enter your Name:</label>
        <input
          type="text"
          id="user-input"
          name="username"
          placeholder="Name"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          // value={password}
          // onChange={handleChange}
          // pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
          // title="Must contain at least one letter, one number, and be at least 8 characters long"
          placeholder="Password"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          // value={email}
          // onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <Link href="/"> Já tenho cadastro</Link>
      </div>
    </>
  );
}
