"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordPage() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await fetch("/api/auth/verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});

			if (res.ok) {
				router.push("/");
				router.refresh();
			} else {
				setError("Invalid password");
				setPassword("");
			}
		} catch {
			setError("Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4 bg-gradient-fixed">
			<form onSubmit={handleSubmit} className="w-full max-w-[280px] space-y-4">
				<div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="w-full px-3 py-2 text-body bg-white/4 border border-white/8 rounded-lg text-white/88 placeholder:text-white/32 focus:border-white/16 focus:bg-white/6 transition-colors"
					/>
				</div>

				{error && (
					<p className="text-footnote text-red-400 text-center">{error}</p>
				)}

				<button
					type="submit"
					disabled={loading || !password}
					className="w-full px-3 py-2 text-[13px] font-medium bg-white/88 text-[#0A0A0A] rounded-lg hover:bg-white/96 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					{loading ? "..." : "Enter"}
				</button>
			</form>
		</div>
	);
}
