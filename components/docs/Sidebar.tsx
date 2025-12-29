"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
	title: string;
	href: string;
}

interface NavSection {
	title: string;
	items: NavItem[];
}

const navigation: NavSection[] = [
	{
		title: "Getting Started",
		items: [
			{ title: "Introduction", href: "/docs" },
			{ title: "Installation", href: "/docs/installation" },
			{ title: "For LLMs", href: "/docs/for-llms" },
		],
	},
	{
		title: "Foundation",
		items: [
			{ title: "Design Tokens", href: "/docs/tokens" },
			{ title: "Accessibility", href: "/docs/accessibility" },
			{ title: "Animation", href: "/docs/animation" },
		],
	},
	{
		title: "Components",
		items: [
			{ title: "Accordion", href: "/docs/components/accordion" },
			{ title: "Alert Dialog", href: "/docs/components/alertdialog" },
			{ title: "Avatar", href: "/docs/components/avatar" },
			{ title: "Button", href: "/docs/components/button" },
			{ title: "Checkbox", href: "/docs/components/checkbox" },
			{ title: "Checkbox Group", href: "/docs/components/checkboxgroup" },
			{ title: "Collapsible", href: "/docs/components/collapsible" },
			{ title: "Combobox", href: "/docs/components/combobox" },
			{ title: "Context Menu", href: "/docs/components/contextmenu" },
			{ title: "Dialog", href: "/docs/components/dialog" },
			{ title: "Field", href: "/docs/components/field" },
			{ title: "Input", href: "/docs/components/input" },
			{ title: "Menu", href: "/docs/components/menu" },
			{ title: "Meter", href: "/docs/components/meter" },
			{ title: "Navigation Menu", href: "/docs/components/navigationmenu" },
			{ title: "Number Field", href: "/docs/components/numberfield" },
			{ title: "Popover", href: "/docs/components/popover" },
			{ title: "Preview Card", href: "/docs/components/previewcard" },
			{ title: "Progress", href: "/docs/components/progress" },
			{ title: "Radio", href: "/docs/components/radio" },
			{ title: "Radio Group", href: "/docs/components/radiogroup" },
			{ title: "Scroll Area", href: "/docs/components/scrollarea" },
			{ title: "Select", href: "/docs/components/select" },
			{ title: "Separator", href: "/docs/components/separator" },
			{ title: "Slider", href: "/docs/components/slider" },
			{ title: "Switch", href: "/docs/components/switch" },
			{ title: "Tabs", href: "/docs/components/tabs" },
			{ title: "Toast", href: "/docs/components/toast" },
			{ title: "Toggle", href: "/docs/components/toggle" },
			{ title: "Toggle Group", href: "/docs/components/togglegroup" },
			{ title: "Toolbar", href: "/docs/components/toolbar" },
			{ title: "Tooltip", href: "/docs/components/tooltip" },
		],
	},
];

interface SidebarProps {
	mobileOpen?: boolean;
	onClose?: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
	const pathname = usePathname();

	return (
		<>
			{/* Mobile overlay */}
			{mobileOpen && (
				<button
					type="button"
					className="fixed inset-0 bg-black/60 z-40 lg:hidden cursor-default"
					onClick={onClose}
					onKeyDown={(e) => e.key === "Escape" && onClose?.()}
					aria-label="Close sidebar"
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
          fixed lg:sticky top-14 left-0 z-40
          w-64 lg:w-56 shrink-0
          h-[calc(100vh-3.5rem)]
          bg-transparent
          overflow-y-auto px-8 scrollbar-none
          transform transition-transform duration-200 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
			>
				<nav className="py-16 space-y-6">
					{navigation.map((section) => (
						<div key={section.title}>
							<h3 className="font-mono text-[10px] leading-[14px] text-white/48 uppercase mb-2">
								{section.title}
							</h3>
							<ul className="space-y-1">
								{section.items.map((item) => {
									const isActive = pathname === item.href;
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												onClick={onClose}
												className={`block py-1.5 px-2 -mx-2 rounded text-[12px] leading-[20px] tracking-[0.12px] font-medium transition-colors ${
													isActive
														? "text-white/88 bg-white/8"
														: "text-white/64 hover:text-white/88"
												}`}
											>
												{item.title}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</nav>
			</aside>
		</>
	);
}
