import React from "react";
import { Navbar as HeadNav } from "flowbite-react";

export default function Navbar() {
  return (
    <HeadNav fluid rounded>
      <HeadNav.Toggle />
      <HeadNav.Collapse>
        <HeadNav.Link href="/navbars" active={true}>
          Home
        </HeadNav.Link>
        <HeadNav.Link href="/navbars">About</HeadNav.Link>
        <HeadNav.Link href="/navbars">Services</HeadNav.Link>
        <HeadNav.Link href="/navbars">Pricing</HeadNav.Link>
        <HeadNav.Link href="/navbars">Contact</HeadNav.Link>
      </HeadNav.Collapse>
      <HeadNav.Brand href="https://flowbite.com/">
        {/* <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        /> */}
        {/* <button
          id="toggleSidebar"
          aria-expanded="true"
          aria-controls="sidebar"
          className="p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Ai Progress Feed
        </span>
      </HeadNav.Brand>
    </HeadNav>
  );
}
