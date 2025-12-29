"use client";

import Link from "next/link";

const Logo = () => (
	<svg
		width="29"
		height="11"
		viewBox="0 0 29 11"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<title>Outpace Systems Logo</title>
		<path
			d="M14.5 5.5C14.5 2.46243 12.0655 0 9.0625 0H5.4375C2.43445 0 0 2.46243 0 5.5C0 8.53757 2.43445 11 5.4375 11H9.0625C12.0655 11 14.5 8.53757 14.5 5.5Z"
			fill="rgba(255, 255, 255, 0.88)"
		/>
		<path
			d="M14.5 0H26.2812C27.7828 0 29 1.23122 29 2.75C29 4.26878 27.7828 5.5 26.2812 5.5H19.9375C16.9344 5.5 14.5 3.03757 14.5 0Z"
			fill="rgba(255, 255, 255, 0.88)"
		/>
		<path
			d="M21.75 11C23.2515 11 24.4687 9.76878 24.4687 8.25C24.4687 6.73122 23.2515 5.5 21.75 5.5H19.9375C16.9344 5.5 14.5 7.96243 14.5 11H21.75Z"
			fill="rgba(255, 255, 255, 0.88)"
		/>
	</svg>
);

const MenuIcon = () => (
	<svg
		width="18"
		height="12"
		viewBox="0 0 18 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<title>Menu</title>
		<path
			d="M0 0H18V2H0V0ZM0 5H18V7H0V5ZM0 10H18V12H0V10Z"
			fill="currentColor"
		/>
	</svg>
);

const CloseIcon = () => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<title>Close</title>
		<path
			d="M1 1L13 13M1 13L13 1"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

interface HeaderProps {
	mobileMenuOpen?: boolean;
	onMobileMenuToggle?: () => void;
}

export function Header({ mobileMenuOpen, onMobileMenuToggle }: HeaderProps) {
	return (
		<header className="h-12 sticky top-0 backdrop-blur-md z-50 px-8">
			<div className="h-full flex items-center justify-between">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onMobileMenuToggle}
						className="lg:hidden p-2 -ml-2 text-white/72 hover:text-white/88 transition-colors"
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					>
						{mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
					</button>
					<Link href="/" className="flex items-center gap-3">
						<Logo />
						<span className="text-[12px] leading-5 font-semibold text-white/88 tracking-[0.12px]">
							Outpace Systems
						</span>
					</Link>
				</div>

				<nav className="hidden md:flex items-center gap-6">
					<Link
						href="/docs"
						className="text-[13px] leading-4 text-white/72 hover:text-white/88 transition-colors tracking-[0.12px]"
					>
						Docs
					</Link>
					<Link
						href="/docs/components/button"
						className="text-[13px] leading-4 text-white/72 hover:text-white/88 transition-colors tracking-[0.12px]"
					>
						Components
					</Link>
					<a
						href="https://github.com/outpacesoftware/systems"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[13px] leading-4 text-white/72 hover:text-white/88 transition-colors tracking-[0.12px]"
					>
						GitHub
					</a>
				</nav>
			</div>
		</header>
	);
}
