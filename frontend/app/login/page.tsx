"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const { token, role } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("email", email);

            router.push("/dashboard");
        } catch {
            setError("Invalid email or password. Please  try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
             <form onSubmit={handleSubmit}
             className="w-full max-w-md space-y-4 rounded-lg border p-8 shadow-sm"
             >
                <h1 className="etxt-2xl font-bold text-blue-600">Welcome Back</h1>

                {error && (
                    <p className="rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>
                )}

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input 
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       className="mt-1 w-full rounded border p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input 
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                       className="mt-1 w-full rounded border p-2"
                    />
                </div>  

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>         
        </main>
    );
}