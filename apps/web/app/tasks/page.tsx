import { createClient } from "@/app/lib/supabase/server";
import { toggleTask, deleteTask } from "../dashboard/action";
import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    RotateCcw,
    Trash2,
} from "lucide-react";

export default async function TasksPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <h1 className="text-2xl font-bold">Please Login First</h1>
            </main>
        );
    }

    const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

    return (
        <main className="min-h-screen bg-gray-100 p-10">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            My Tasks
                        </h1>
                        <p className="mt-2 text-gray-600">
                            View and manage all your tasks.
                        </p>
                    </div>

                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
                    >
                        <ArrowLeft size={18} />
                        Dashboard
                    </Link>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-lg">
                    {tasks && tasks.length > 0 ? (
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between rounded-2xl border p-5"
                                >
                                    <div>
                                        <h2
                                            className={`text-xl font-semibold ${task.is_completed
                                                    ? "line-through text-gray-400"
                                                    : "text-gray-900"
                                                }`}
                                        >
                                            {task.title}
                                        </h2>

                                        <p className="mt-1 text-gray-500">
                                            {task.is_completed
                                                ? "Completed"
                                                : "Pending"}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">

                                        <form>
                                            <button
                                                formAction={toggleTask.bind(
                                                    null,
                                                    task.id,
                                                    task.is_completed
                                                )}
                                                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-white ${task.is_completed
                                                        ? "bg-orange-500 hover:bg-orange-600"
                                                        : "bg-green-600 hover:bg-green-700"
                                                    }`}
                                            >
                                                {task.is_completed ? (
                                                    <>
                                                        <RotateCcw size={18} />
                                                        Undo
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 size={18} />
                                                        Done
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        <form>
                                            <button
                                                formAction={deleteTask.bind(null, task.id)}
                                                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                            >
                                                <Trash2 size={18} />
                                                Delete
                                            </button>
                                        </form>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <h2 className="text-3xl font-bold text-gray-800">
                                No Tasks Found
                            </h2>

                            <p className="mt-3 text-gray-500">
                                Go to Dashboard and add your first task.
                            </p>

                            <Link
                                href="/dashboard"
                                className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}