"use client";

import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState("login");
  const changeForm = () => {
    console.log(form);
    if (form == "login") setForm("signup");
    else setForm("login");
  };
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      router.replace("/boards");
    }
  }, []);
  return (
    <main className="w-full h-full home">
      {form == "login" ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <SignupForm changeForm={changeForm} />
      )}
    </main>
  );
}
