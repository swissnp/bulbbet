import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="fixed top-4 z-50 w-full px-4">
      <div className="navbar w-full rounded-2xl bg-base-200 drop-shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu-compact menu dropdown-content rounded-box mt-3 w-52 bg-base-200 p-2 shadow"
            >
              <li>
                <Link href="/collection">Listings</Link>
              </li>
              {/* <li>
                <Link className="justify-between" href="/story">
                  History
                </Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li> */}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl normal-case" href="/">
            {"💡🎰 Bulbbet"}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/collection">Listings</Link>
            </li>
            {/* <li>
              <Link href="/story">History</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end mr-2">
          <div className="flex w-10 flex-row justify-end gap-2">
            {/* <label tabIndex={0} className="btn-ghost btn-circle btn flex px-3">
            <Link className="indicator" href={"/cart"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart && (
                <span className="badge badge-sm indicator-item">
                  {cart.length}
                </span>
              )}
            </Link>
          </label> */}
            <Link className="btn btn-secondary rounded-full" href={"/create"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pen-square h-5 w-5"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
              </svg>
            </Link>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-circle dropdown btn-ghost flex px-3"
              >
                {/*  account button begin */}
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </label>{" "}
              <ul
                tabIndex={0}
                className="menu-compact menu dropdown-content rounded-box relative mt-3 w-52 bg-base-200 p-2 shadow"
              >
                {!session ? (
                  <div>
                    <li>
                      <Link href="/auth/login">Login</Link>
                    </li>
                  </div>
                ) : (
                  <div>
                    <li>
                      <div>{+session.user.amount.toFixed(2)}💡</div>
                    </li>
                    <li>
                      <Link href="/history/bettings">Betting History</Link>
                    </li>
                    <li>
                      <Link href="/history/events">Event History</Link>
                    </li>
                    <li>
                      <button onClick={() => signOut()}>Sign out</button>
                    </li>
                  </div>
                )}
              </ul>
            </div>
            {/*  account button end */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
