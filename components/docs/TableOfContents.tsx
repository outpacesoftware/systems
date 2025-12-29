"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface TOCItem {
	id: string;
	title: string;
}

interface TableOfContentsProps {
	items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>("");
	const [mounted, setMounted] = useState(false);
	const visibleSections = useRef<Set<string>>(new Set());

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted || items.length === 0) return;

		const scrollContainer = document.querySelector("main");
		if (!scrollContainer) return;

		// Fallback scroll handler for bottom of page
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
			const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

			if (isNearBottom) {
				// Find the last heading that's above the viewport bottom
				let lastVisibleId = items[0]?.id || "";
				for (const item of items) {
					const element = document.getElementById(item.id);
					if (element) {
						const rect = element.getBoundingClientRect();
						if (rect.top < window.innerHeight) {
							lastVisibleId = item.id;
						}
					}
				}
				setActiveId(lastVisibleId);
			}
		};

		// Update active based on which sections are visible
		const updateActive = () => {
			// Check if near bottom first
			const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
			if (scrollTop + clientHeight >= scrollHeight - 100) {
				handleScroll();
				return;
			}

			// Find the first visible section in order
			for (const item of items) {
				if (visibleSections.current.has(item.id)) {
					setActiveId(item.id);
					return;
				}
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visibleSections.current.add(entry.target.id);
					} else {
						visibleSections.current.delete(entry.target.id);
					}
				}
				updateActive();
			},
			{
				root: scrollContainer,
				rootMargin: "-80px 0px -60% 0px",
				threshold: 0,
			},
		);

		// Observe all section headings
		for (const item of items) {
			const element = document.getElementById(item.id);
			if (element) {
				observer.observe(element);
			}
		}

		scrollContainer.addEventListener("scroll", handleScroll);

		return () => {
			observer.disconnect();
			scrollContainer.removeEventListener("scroll", handleScroll);
		};
	}, [items, mounted]);

	const handleClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	if (items.length === 0 || !mounted) return null;

	const content = (
		<aside
			className="hidden xl:block fixed top-14 right-0 z-30 w-48 h-[calc(100vh-3.5rem)] overflow-y-auto px-8"
			style={{
				maskImage:
					"linear-gradient(to bottom, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)",
				WebkitMaskImage:
					"linear-gradient(to bottom, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)",
			}}
		>
			<nav className="py-16">
				<h4 className="font-mono text-[10px] leading-[14px] text-white/48 uppercase mb-2">
					On this page
				</h4>
				<ul className="space-y-1">
					{items.map((item) => (
						<li key={item.id}>
							<button
								type="button"
								onClick={() => handleClick(item.id)}
								className={`block text-left text-[12px] leading-[20px] tracking-[0.12px] py-1 transition-colors ${
									activeId === item.id
										? "text-white/88 font-medium"
										: "text-white/48 hover:text-white/72"
								}`}
							>
								{item.title}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);

	return createPortal(content, document.body);
}
