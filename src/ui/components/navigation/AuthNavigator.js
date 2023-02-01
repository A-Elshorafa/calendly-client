import React from "react";
import Link from "next/link";

export default ({children}) => {
  return (
    <div className="overflow-hidden">
      <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
      <div
        className="container mx-auto flex flex-wrap items-center justify-between"
        bis_skin_checked="1"
      >
        <p href="https://paraveller.com/" className="flex items-center text-xl font-bold">
          Calendly Demo
        </p>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
          bis_skin_checked="1"
        >
          <ul
            className="
              mt-4
              flex flex-col
              rounded-lg
              p-4
              md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium
            "
          >
            <li>
              <Link
                href='/'
                className="block rounded py-2 pr-4 pl-3 text-white text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/login'
                className="block rounded py-2 pr-4 pl-3 text-white text-lg">
                Login
              </Link>
            </li>
            <li>
              <Link
                href='/register'
                className="block rounded py-2 pr-4 pl-3 text-white text-lg">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {children}
  </div>
  )
}