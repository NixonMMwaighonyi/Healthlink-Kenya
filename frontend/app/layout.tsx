import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "HealthLink Kenya",
    description: "Connecting patients with doctors across Kenya",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}