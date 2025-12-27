"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/app/redux/features/userAuth/userAuthSlice";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Menu, X, CircleUser, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const userAuth = useSelector((state: any) => state.authUser.isAuthenticated);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const navLink =
    "relative text-sm font-medium text-neutral-300 hover:text-red-500 transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-500 hover:after:w-full after:transition-all after:duration-300";

  async function logUserOut() {
    try {
      await axios.post("/api/logout");
      dispatch(logOut());
      redirect("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(10,10,10,0.85)"
          : "rgba(10, 10, 10, 1)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between text-white border-b border-white/5"
    >
      {/* Logo */}
      <Link href="/" className="text-xl font-bold tracking-tight select-none">
        <span className="text-red-500">NBA</span>
        <span className="text-neutral-200">Data</span>
      </Link>

      {/* Center Nav */}
      <div className="hidden md:flex items-center justify-center gap-10">
        <Link href="/" className={navLink}>
          Home
        </Link>
        <Link href="/teamslist" className={navLink}>
          Teams
        </Link>
        <Link href="/standings" className={navLink}>
          Standings
        </Link>
      </div>

      {/* Right Side - Account hover dropdown */}
      <div className="hidden md:flex items-center gap-6 relative">
        {userAuth && (
          <div
            className="relative z-50"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <CircleUser
              size={26}
              className="cursor-pointer hover:text-red-500 transition-colors duration-300"
            />
            <AnimatePresence>
              {hovering && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-44 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg py-2 text-sm"
                >
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-neutral-800 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/favorites"
                    className="block px-4 py-2 hover:bg-neutral-800 transition-colors"
                  >
                    Favorites
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-neutral-800 transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logUserOut}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-neutral-800 transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {!userAuth && (
          <Link
            href="/login"
            className="text-neutral-300 hover:text-red-500 transition-colors duration-300"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 flex flex-col items-center py-5 md:hidden"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="py-2 text-white hover:text-red-500"
            >
              Home
            </Link>
            <Link
              href="/teamslist"
              onClick={() => setIsOpen(false)}
              className="py-2 text-white hover:text-red-500"
            >
              Teams
            </Link>
            <Link
              href="/standings"
              onClick={() => setIsOpen(false)}
              className="py-2 text-white hover:text-red-500"
            >
              Standings
            </Link>

            {/* Account Dropdown (Mobile Only) */}
            {userAuth && (
              <div className="w-full mt-3 border-t border-neutral-800">
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="flex items-center justify-center w-full py-2 text-white hover:text-red-500 transition-colors"
                >
                  Account
                  {mobileDropdownOpen ? (
                    <ChevronUp size={18} className="ml-1" />
                  ) : (
                    <ChevronDown size={18} className="ml-1" />
                  )}
                </button>
                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center w-full text-sm"
                    >
                      <Link
                        href="/account"
                        onClick={() => setIsOpen(false)}
                        className="py-2 text-neutral-300 hover:text-red-500"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/favorites"
                        onClick={() => setIsOpen(false)}
                        className="py-2 text-neutral-300 hover:text-red-500"
                      >
                        Favorites
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsOpen(false)}
                        className="py-2 text-neutral-300 hover:text-red-500"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          logUserOut();
                        }}
                        className="py-2 text-red-500 hover:text-red-400"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {!userAuth && (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="py-2 text-white hover:text-red-500"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
