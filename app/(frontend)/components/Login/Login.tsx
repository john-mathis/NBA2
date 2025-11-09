"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/redux/store";
import { loginSuccess } from "@/app/redux/features/userAuth/userAuthSlice";

type UserDataProps = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<UserDataProps>();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.authUser.user);
  console.log(user);

  const POST = async (data: UserDataProps) => {
    try {
      const response = await axios.post("/api/login", data);
      dispatch(loginSuccess(response.data.user));
      localStorage.setItem("user", data.username);
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    redirect("/");
  };

  return (
    <div className="h-screen overflow-y-hidden flex items-center justify-center bg-neutral-900">
      <form
        onSubmit={handleSubmit(POST)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign in</h2>

        <div>
          <label htmlFor="username" className="block mb-1 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("username")}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer uppercase"
        >
          Sign in
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <span>
            <Link className="" href={"/signup"}>
              Sign up
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
