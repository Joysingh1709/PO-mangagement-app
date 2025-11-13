"use client";
import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { dataJson } from "../../lib/dataJson";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 p-8 font-sans">
      <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-tr from-white/60 to-white/30 p-10 shadow-2xl backdrop-blur-lg">
        <header className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-indigo-700">Create an account</h2>
          <p className="text-sm text-gray-500">Fast · Accessible · Modern</p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="mb-6 text-gray-600">
              Fill the form to create a demo account. Fields are generated dynamically from JSON. Try changing the JSON to see different field types (TEXT, LIST, RADIO).
            </p>
            <DynamicForm fields={dataJson.data} />
          </div>

          <aside className="order-1 flex flex-col items-center justify-center md:order-2">
            <div className="mb-4 h-40 w-40 animate-pulse rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 shadow-inner"></div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Why sign up?</h3>
              <p className="mt-2 text-sm text-gray-500">Your data is stored locally for this demo.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
