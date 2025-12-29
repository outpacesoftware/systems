"use client";

import { ArrowRight, Command, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { navigation } from "./Sidebar";

// Flatten navigation into searchable items with category
interface SearchableItem {
	title: string;
	href: string;
	category: string;
}

const searchableItems: SearchableItem[] = navigation.flatMap((section) =>
	section.items.map((item) => ({
		title: item.title,
		href: item.href,
		category: section.title,
	})),
);

// Simple fuzzy search
function searchItems(query: string): SearchableItem[] {
	if (!query.trim()) return searchableItems;

	const lowerQuery = query.toLowerCase();
	const results = searchableItems.filter((item) => {
		const titleMatch = item.title.toLowerCase().includes(lowerQuery);
		const categoryMatch = item.category.toLowerCase().includes(lowerQuery);
		return titleMatch || categoryMatch;
	});

	// Sort by relevance (title starts with query first)
	results.sort((a, b) => {
		const aStarts = a.title.toLowerCase().startsWith(lowerQuery);
		const bStarts = b.title.toLowerCase().startsWith(lowerQuery);
		if (aStarts && !bStarts) return -1;
		if (!aStarts && bStarts) return 1;
		return 0;
	});

	return results;
}

interface SearchModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const resultsRef = useRef<HTMLDivElement>(null);
	const gsapRef = useRef<typeof import("gsap").gsap | null>(null);

	const results = searchItems(query);

	// Load GSAP dynamically
	useEffect(() => {
		import("gsap").then((mod) => {
			gsapRef.current = mod.gsap;
		});
	}, []);

	// Handle open/close animations
	useLayoutEffect(() => {
		const gsap = gsapRef.current;
		if (!gsap) {
			// Fallback without GSAP
			setIsVisible(open);
			return;
		}

		if (open) {
			setIsVisible(true);
			setIsAnimating(true);

			// Animate backdrop
			gsap.fromTo(
				backdropRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.2, ease: "power2.out" },
			);

			// Animate content
			gsap.fromTo(
				contentRef.current,
				{
					opacity: 0,
					scale: 0.96,
					y: -8,
					filter: "blur(4px)",
				},
				{
					opacity: 1,
					scale: 1,
					y: 0,
					filter: "blur(0px)",
					duration: 0.25,
					ease: "power3.out",
					onComplete: () => setIsAnimating(false),
				},
			);
		} else if (isVisible) {
			setIsAnimating(true);

			// Animate out
			gsap.to(backdropRef.current, {
				opacity: 0,
				duration: 0.15,
				ease: "power2.in",
			});

			gsap.to(contentRef.current, {
				opacity: 0,
				scale: 0.96,
				y: -8,
				filter: "blur(4px)",
				duration: 0.15,
				ease: "power2.in",
				onComplete: () => {
					setIsVisible(false);
					setIsAnimating(false);
					setQuery("");
					setSelectedIndex(0);
				},
			});
		}
	}, [open, isVisible]);

	// Focus input when opened (with delay to ensure element is rendered)
	useEffect(() => {
		if (open && isVisible) {
			// Small delay to ensure the input is rendered and animation has started
			const timer = setTimeout(() => {
				inputRef.current?.focus();
			}, 50);
			return () => clearTimeout(timer);
		}
	}, [open, isVisible]);

	// Global Escape key handler
	useEffect(() => {
		if (!open) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onOpenChange(false);
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [open, onOpenChange]);

	// Reset selected index when results change
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run on query change
	useEffect(() => {
		setSelectedIndex(0);
	}, [query]);

	// Handle keyboard navigation
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					setSelectedIndex((i) => {
						const next = Math.min(i + 1, results.length - 1);
						// Scroll item into view
						const item = resultsRef.current?.children[next] as HTMLElement;
						item?.scrollIntoView({ block: "nearest" });
						return next;
					});
					break;
				case "ArrowUp":
					e.preventDefault();
					setSelectedIndex((i) => {
						const prev = Math.max(i - 1, 0);
						// Scroll item into view
						const item = resultsRef.current?.children[prev] as HTMLElement;
						item?.scrollIntoView({ block: "nearest" });
						return prev;
					});
					break;
				case "Enter":
					e.preventDefault();
					if (results[selectedIndex]) {
						router.push(results[selectedIndex].href);
						onOpenChange(false);
					}
					break;
			}
		},
		[results, selectedIndex, router, onOpenChange],
	);

	// Handle result click
	const handleResultClick = (href: string) => {
		router.push(href);
		onOpenChange(false);
	};

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-50">
			{/* Backdrop */}
			<div
				ref={backdropRef}
				className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
				onClick={() => !isAnimating && onOpenChange(false)}
				aria-hidden="true"
			/>

			{/* Content */}
			<div className="absolute inset-0 flex items-start justify-center pt-16 pointer-events-none">
				<div
					ref={contentRef}
					className="w-full max-w-xl h-[472px] bg-[#090A0C] bg-[image:linear-gradient(rgba(255,255,255,0.04),rgba(255,255,255,0.04))] rounded-xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
					role="dialog"
					aria-modal="true"
					aria-label="Search documentation"
				>
					{/* Search Input */}
					<div className="flex items-center gap-3 px-4 py-3">
						<Search size={16} className="text-white/32 shrink-0" />
						<input
							ref={inputRef}
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Search documentation..."
							className="flex-1 bg-transparent text-white text-[15px] placeholder:text-white/32 outline-none"
							aria-label="Search"
							autoComplete="off"
							autoCorrect="off"
							spellCheck={false}
						/>
					</div>

					{/* Results */}
					<div
						ref={resultsRef}
						className="flex-1 overflow-y-auto py-2"
						style={{
							maskImage:
								"linear-gradient(to bottom, transparent 0%, black 16px, black calc(100% - 16px), transparent 100%)",
							WebkitMaskImage:
								"linear-gradient(to bottom, transparent 0%, black 16px, black calc(100% - 16px), transparent 100%)",
						}}
						role="listbox"
					>
						{results.length === 0 ? (
							<div className="px-4 py-8 text-center text-white/32 text-[13px]">
								No results found for &ldquo;{query}&rdquo;
							</div>
						) : (
							(() => {
								let itemIndex = 0;
								const grouped = results.reduce(
									(acc, item) => {
										if (!acc[item.category]) acc[item.category] = [];
										acc[item.category].push(item);
										return acc;
									},
									{} as Record<string, SearchableItem[]>,
								);

								return Object.entries(grouped).map(([category, items]) => (
									<div key={category}>
										<h3 className="font-mono text-[10px] leading-[14px] text-white/48 uppercase px-4 pt-4 pb-2">
											{category}
										</h3>
										{items.map((item) => {
											const currentIndex = itemIndex++;
											return (
												<button
													type="button"
													key={item.href}
													onClick={() => handleResultClick(item.href)}
													onMouseEnter={() => setSelectedIndex(currentIndex)}
													className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
														currentIndex === selectedIndex
															? "bg-white/8"
															: "hover:bg-white/4"
													}`}
													role="option"
													aria-selected={currentIndex === selectedIndex}
												>
													<div className="text-[12px] leading-[20px] tracking-[0.12px] text-white/88 font-medium truncate">
														{item.title}
													</div>
													<ArrowRight
														size={14}
														className={`shrink-0 ml-auto text-white/24 transition-opacity ${
															currentIndex === selectedIndex
																? "opacity-100"
																: "opacity-0"
														}`}
													/>
												</button>
											);
										})}
									</div>
								));
							})()
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// Hook for global Cmd+K shortcut
export function useSearchShortcut(onOpen: () => void) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				onOpen();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onOpen]);
}

// Search trigger button for header
export function SearchTrigger({ onClick }: { onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-white/48 bg-white/4 hover:bg-white/8 rounded-lg border border-white/8 transition-colors"
		>
			<Search size={14} />
			<span className="hidden sm:inline">Search</span>
			<kbd className="hidden sm:flex items-center gap-0.5 ml-2 text-[10px] text-white/32">
				<Command size={10} />K
			</kbd>
		</button>
	);
}
