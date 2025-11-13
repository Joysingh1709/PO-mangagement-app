import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-white p-8">
      <div className="max-w-2xl rounded-2xl bg-white p-12 text-center shadow-xl">
        <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page not found</p>
        <p className="mt-2 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link href="/" className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
