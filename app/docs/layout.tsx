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
		<div className="min-h-screen text-white bg-gradient-fixed">
			<Header
				mobileMenuOpen={mobileMenuOpen}
				onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
			/>
			<div className="flex">
				<Sidebar
					mobileOpen={mobileMenuOpen}
					onClose={() => setMobileMenuOpen(false)}
				/>
				<main className="flex-1 min-w-0 px-4 md:px-8 py-20 flex justify-center">
					<div className="w-full max-w-3xl py-20">{children}</div>
				</main>
			</div>
		</div>
	);
}
