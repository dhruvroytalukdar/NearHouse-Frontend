import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppContext } from "./auth";

export default function Login() {
  const authuser = useAppContext();
  const auth = getAuth();
  const router = useRouter();

  if (authuser) router.push("/");

  const [query, setQuery] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (query.email.length > 0 && query.password.length > 0) {
      await signInWithEmailAndPassword(auth, query.email, query.password);
      router.push("/");
    }
  }

  return (
    <div className="w-11/12 lg:w-8/12 height mx-auto flex items-center justify-center">
      <Head>
        <title>Login Page</title>
      </Head>
      <form
        method="POST"
        className="w-full lg:w-2/5 h-2/3 border-2 rounded-lg flex flex-col"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-3xl font-bold p-4">LogIn</p>
        <p className="w-10/12 text-xl mx-auto my-5">Email</p>
        <input
          className="mx-auto w-10/12 p-1 border-2 border-gray-300 rounded-sm"
          type="text"
          onChange={handleChange}
          name="email"
        />
        <p className="w-10/12 text-xl mx-auto my-5">Password</p>
        <input
          className="mx-auto w-10/12 p-1 border-2 border-gray-300 rounded-sm"
          type="password"
          onChange={handleChange}
          name="password"
        />
        <div className="w-10/12 mx-auto py-5 flex">
          <input
            className="hover:bg-gray-300 hover:text-black cursor-pointer rounded-md px-3 py-2 bg-black text-white"
            value="LogIn"
            type="submit"
          />
          <button
            className="hover:bg-gray-300 hover:text-black ml-auto rounded-md px-3 py-2 bg-black text-white"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
