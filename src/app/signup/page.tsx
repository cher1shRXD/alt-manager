"use client";

const Signup = () => {
  const signup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email: "tw080401@naver.com", password: "Tw080401!!**", name: "김태우" })
    })

    const data = res.json();

    console.log(data);
  }

  return (
    <button onClick={signup}>Signup</button>
  )
}

export default Signup