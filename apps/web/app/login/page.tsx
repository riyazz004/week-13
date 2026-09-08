"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        router.push("/dashboard");
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="bg-indigo-100 p-5 rounded-full">
                        <Lock className="h-10 w-10 text-indigo-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-black">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Login to continue managing your tasks.
                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full border rounded-xl pl-10 p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border rounded-xl pl-10 p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-indigo-600 font-semibold"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
}