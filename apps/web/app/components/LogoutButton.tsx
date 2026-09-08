"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        const supabase = createClient();

        await supabase.auth.signOut();

        router.push("/login");
        router.refresh();
    }

    return (
        <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-600 transition"
        >
            <LogOut size={20} />
            Logout
        </button>
    );
}