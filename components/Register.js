import useSWR from "swr";

export default function RegisterForm() {
  const { mutate } = useSWR("/api/users");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const registerData = Object.fromEntries(formData);

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (response.ok) {
      mutate();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user-input">Enter your Name:</label>
      <input type="text" id="user-input" name="user" required />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        // value={password}
        // onChange={handleChange}
        pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
        title="Must contain at least one letter, one number, and be at least 8 characters long"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
