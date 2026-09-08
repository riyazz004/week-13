"use client";

import type { Task } from "@repo/common-types";
import { useState } from "react";
import {
    CheckCircle2,
    RotateCcw,
    Trash2,
    Pencil,
    Save,
    X,
} from "lucide-react";

import {
    toggleTask,
    deleteTask,
    updateTask,
} from "@/app/dashboard/action";



export default function TaskItem({
    task,
}: {
    task: Task;
}) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);

    return (
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-5 hover:shadow-md transition">
            <div className="flex-1">
                {editing ? (
                    <form
                        action={async (formData) => {
                            formData.append("title", title);
                            await updateTask(task.id, formData);
                            setEditing(false);
                        }}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="flex-1 rounded-lg border px-3 py-2"
                        />

                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            <Save size={18} />
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                setTitle(task.title);
                            }}
                            className="flex items-center gap-2 rounded-xl bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                    </form>
                ) : (
                    <>
                        <h3
                            className={`text-lg font-semibold ${task.is_completed
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                                }`}
                        >
                            {task.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            {task.is_completed ? "Completed" : "Pending"}
                        </p>
                    </>
                )}
            </div>

            {!editing && (
                <div className="flex gap-3">
                    <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        <Pencil size={18} />
                        Edit
                    </button>

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
            )}
        </div>
    );
}