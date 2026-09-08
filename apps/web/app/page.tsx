import Link from "next/link";
import { CheckCircle2, ArrowRight, ListTodo } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <ListTodo className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-indigo-700">
            Task Manager
          </h1>
        </div>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-lg border border-indigo-600 px-5 py-2 font-medium text-indigo-600 transition hover:bg-indigo-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-8 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-5xl font-extrabold leading-tight text-gray-900">
            Organize your tasks.
            <br />
            <span className="text-indigo-600">
              Be more productive.
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            A simple and secure task manager built with
            Next.js, Supabase, Server Actions, and Zod.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Preview Card */}
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <h3 className="mb-6 text-2xl font-bold">
            My Tasks
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" />
                <span>Learn Next.js</span>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <span>Build CRUD App</span>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <span>Deploy to Vercel</span>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                Pending
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-8 px-8 pb-20 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-bold">
            Easy to Use
          </h3>

          <p className="mt-3 text-gray-600">
            Add, edit and manage your daily tasks in
            seconds.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-bold">
            Secure
          </h3>

          <p className="mt-3 text-gray-600">
            User authentication and Row Level Security
            keep your data private.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-bold">
            Fast
          </h3>

          <p className="mt-3 text-gray-600">
            Built using Next.js Server Actions for a
            modern full-stack experience.
          </p>
        </div>
      </section>
    </main>
  );
}