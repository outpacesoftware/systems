"use client";

import { useCallback, useState } from "react";
import { Header, Sidebar } from "@/components/docs";
import { SearchModal, useSearchShortcut } from "@/components/docs/SearchModal";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	const openSearch = useCallback(() => setSearchOpen(true), []);
	useSearchShortcut(openSearch);

	return (
		<div className="min-h-screen text-white bg-gradient-fixed">
			<Header
				mobileMenuOpen={mobileMenuOpen}
				onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
				onSearchClick={openSearch}
			/>
			<SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
			<Sidebar
				mobileOpen={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
			/>
			<div className="lg:ml-56 xl:mr-48">
				<main
					className="min-w-0 px-4 md:px-8 py-16 overflow-y-auto h-[calc(100vh-3.5rem)]"
					style={{
						maskImage:
							"linear-gradient(to bottom, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)",
						WebkitMaskImage:
							"linear-gradient(to bottom, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)",
					}}
				>
					<div className="max-w-3xl mx-auto">{children}</div>
				</main>
			</div>
		</div>
	);
}
