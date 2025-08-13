import React from "react";
import { ArrowLeft, BookCopy } from "lucide-react"; // Using lucide-react for icons

/**
 * A minimal, mobile-first landing page for the member dashboard.
 * Informs the user that the page is under development.
 */
const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-md w-full">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Title */}
            <div className="flex items-center space-x-2">
              <BookCopy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Library Dashboard
              </span>
            </div>
            {/* Back Button */}
            <a
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.75 3.75 0 00-5.304-5.304l-2.472 2.472M11.42 15.17L5.877 21m11.373-11.373a3.75 3.75 0 00-5.304-5.304L3 9.75l5.304 5.304L17.25 3.75z"
            />
          </svg>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Under Development
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            The member dashboard is currently being built.
          </p>
          <p className="mt-2 text-md text-gray-500 dark:text-gray-500">
            Thank you for your patience.
          </p>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-4 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SBSSU Library. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
