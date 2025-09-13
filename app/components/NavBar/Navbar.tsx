"use client";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="bg-red-500 flex flex-col">
      <Link href="/">Home</Link>
      <Link href="/Teams">Teams</Link>
      <Link href="/TeamsList">TeamsList</Link>
    </div>
  );
};

export default Navbar;
