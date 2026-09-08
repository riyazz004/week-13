import Link from "next/link";
import LogoutButton from "@/app/components/LogoutButton";
import AddTaskForm from "@/app/components/AddTaskForm";
import TaskItem from "../components/TaskItem";
import { createClient } from "@/app/lib/supabase/server";
import {
    LayoutDashboard,
    ListTodo,
    CheckCircle2,
} from "lucide-react";

export default async function Dashboard() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Please login first.
                </h1>
            </main>
        );
    }

    const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

    return (
        <main className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <aside className="w-72 bg-indigo-700 text-white p-6 flex flex-col justify-between">

                <div>

                    <div className="flex items-center gap-3 mb-10">
                        <CheckCircle2 size={34} />
                        <h1 className="text-2xl font-bold">
                            TaskFlow
                        </h1>
                    </div>

                    <nav className="space-y-3">

                        <div className="flex items-center gap-3 rounded-xl bg-indigo-600 p-3">
                            <LayoutDashboard size={20} />
                            Dashboard
                        </div>

                        <Link href="/tasks" className="flex items-center gap-3 rounded-xl p-3 hover:bg-indigo-600">
                            <ListTodo size={20} />
                            My Tasks
                        </Link>

                    </nav>

                </div>

                <LogoutButton />

            </aside>

            {/* Main Content */}

            <section className="flex-1 p-10">

                {/* Header */}

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Welcome 👋
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your daily tasks efficiently.
                        </p>

                    </div>

                    <div className="rounded-xl bg-white p-4 shadow">
                        <p className="text-sm text-gray-500">
                            Logged in as
                        </p>

                        <p className="font-semibold">
                            {user.email}
                        </p>

                    </div>

                </div>

                {/* Add Task */}

                <div className="rounded-3xl bg-white p-6 shadow-lg mb-8">

                    <h2 className="text-2xl font-bold mb-5">
                        Add New Task
                    </h2>
                    <AddTaskForm />

                </div>

                {/* Statistics */}

                <div className="grid gap-6 md:grid-cols-3 mb-10">

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <h3 className="text-gray-500">
                            Total Tasks
                        </h3>

                        <p className="mt-2 text-3xl font-bold">
                            {tasks?.length || 0}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <h3 className="text-gray-500">
                            Completed
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-green-600">
                            {tasks?.filter((t) => t.is_completed).length || 0}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <h3 className="text-gray-500">
                            Pending
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-orange-500">
                            {tasks?.filter((t) => !t.is_completed).length || 0}
                        </p>
                    </div>

                </div>

                {/* Task List */}

                {/* Task List */}

                <div className="rounded-3xl bg-white p-6 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold">
                        My Tasks
                    </h2>

                    {tasks && tasks.length > 0 ? (
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
                            <div className="mb-4 text-6xl">📝</div>

                            <h3 className="text-2xl font-semibold">
                                No Tasks Yet
                            </h3>

                            <p className="mt-2 text-gray-500">
                                Add your first task to get started.
                            </p>
                        </div>
                    )}
                </div>

            </section>
        </main>
    );
}