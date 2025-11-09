"use client";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type UserDataProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const { register, handleSubmit } = useForm<UserDataProps>();

  const POST = async (data: UserDataProps) => {
    const response = await axios.post("/api/signup", data);

    if (response.status === 200) {
      redirect("/");
    }
  };

  return (
    <div className="h-screen overflow-y-hidden flex items-center justify-center bg-neutral-900">
      <form
        onSubmit={handleSubmit(POST)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <div>
          <label htmlFor="username" className="block mb-1 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            required
            id="username"
            placeholder="Enter your username"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("username")}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email address"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email")}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password")}
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-sm font-medium"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            placeholder="Confirm your password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("confirmPassword")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer uppercase"
        >
          Sign Up
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <span>
            <Link className="" href={"/login"}>
              Sign in
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
