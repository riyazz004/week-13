"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, UserPlus } from "lucide-react";

export default function SignupPage() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Account created successfully!");
        router.push("/login");
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-indigo-100 p-5">
                        <UserPlus className="h-10 w-10 text-indigo-600" />
                    </div>
                </div>

                <h1 className="text-center text-3xl font-bold">
                    Create Account
                </h1>

                <p className="mt-2 mb-8 text-center text-gray-500">
                    Sign up to start managing your tasks.
                </p>

                <form onSubmit={handleSignup} className="space-y-5">

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full rounded-xl border p-3 pl-10 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-xl border p-3 pl-10 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-indigo-600"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    );
}