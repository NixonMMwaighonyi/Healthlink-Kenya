"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/users/register", {
                fullName,
                email,
                password,
                phone,
                role: "PATIENT",
            });

            router.push("/login");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 rounded-lg border p-8 shadow-sm"
            >
                <h1 className="text-2xl font-bold text-blue-600">Create your account</h1>

                {error && (
                    <p className="rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>
                )}

                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="mt-1 w-full rounded border p-2"
                    />
                </div>

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
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>
        </main>
    );
}