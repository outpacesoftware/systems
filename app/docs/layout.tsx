"use client";

import { useState } from "react";
import { Header, Sidebar } from "@/components/docs";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-black text-white bg-gradient-fixed">
			<Header
				mobileMenuOpen={mobileMenuOpen}
				onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
			/>
			<div className="flex">
				<Sidebar
					mobileOpen={mobileMenuOpen}
					onClose={() => setMobileMenuOpen(false)}
				/>
				<main className="flex-1 min-w-0 p-4 md:p-8 flex justify-center">
					<div className="w-full max-w-3xl">{children}</div>
				</main>
			</div>
		</div>
	);
}
