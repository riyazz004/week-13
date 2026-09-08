"use client";

import { PlusCircle } from "lucide-react";
import { addTask } from "@/app/dashboard/action";
import { useRef } from "react";

export default function AddTaskForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function formAction(formData: FormData) {
        await addTask(formData);
        formRef.current?.reset();
    }

    return (
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">
                Add New Task
            </h2>

            <form
                ref={formRef}
                action={formAction}
                className="flex gap-4"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Enter your task..."
                    required
                    className="flex-1 rounded-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition"
                >
                    <PlusCircle size={20} />
                    Add
                </button>
            </form>
        </div>
    );
}