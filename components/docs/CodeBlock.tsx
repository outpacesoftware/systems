"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { Highlight, type PrismTheme } from "prism-react-renderer";
import { useCallback, useState } from "react";

// Tokyo Night theme with 8% white background
const tokyoNight: PrismTheme = {
	plain: {
		color: "#a9b1d6",
		backgroundColor: "rgba(255, 255, 255, 0.08)",
	},
	styles: [
		{
			types: ["comment", "prolog", "doctype", "cdata"],
			style: { color: "#565f89", fontStyle: "italic" },
		},
		{
			types: ["namespace"],
			style: { opacity: 0.7 },
		},
		{
			types: ["string", "attr-value"],
			style: { color: "#9ece6a" },
		},
		{
			types: ["punctuation", "operator"],
			style: { color: "#89ddff" },
		},
		{
			types: [
				"entity",
				"url",
				"symbol",
				"number",
				"boolean",
				"variable",
				"constant",
				"property",
				"regex",
				"inserted",
			],
			style: { color: "#ff9e64" },
		},
		{
			types: ["atrule", "keyword", "attr-name"],
			style: { color: "#bb9af7" },
		},
		{
			types: ["function", "deleted", "tag"],
			style: { color: "#7aa2f7" },
		},
		{
			types: ["function-variable"],
			style: { color: "#7aa2f7" },
		},
		{
			types: ["selector", "class-name"],
			style: { color: "#7dcfff" },
		},
		{
			types: ["tag", "builtin", "char"],
			style: { color: "#f7768e" },
		},
	],
};

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const packageManagers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

function convertCommand(code: string, manager: PackageManager): string {
	// Handle different command patterns
	return code
		.split("\n")
		.map((line) => {
			const trimmed = line.trim();

			// pnpm add -> npm install / yarn add / bun add
			if (trimmed.startsWith("pnpm add ")) {
				const pkg = trimmed.replace("pnpm add ", "");
				switch (manager) {
					case "npm":
						return `npm install ${pkg}`;
					case "yarn":
						return `yarn add ${pkg}`;
					case "bun":
						return `bun add ${pkg}`;
					default:
						return line;
				}
			}

			// pnpm install -> npm install / yarn / bun install
			if (trimmed === "pnpm install" || trimmed === "pnpm i") {
				switch (manager) {
					case "npm":
						return "npm install";
					case "yarn":
						return "yarn";
					case "bun":
						return "bun install";
					default:
						return line;
				}
			}

			// pnpm dlx -> npx / yarn dlx / bunx
			if (trimmed.startsWith("pnpm dlx ")) {
				const cmd = trimmed.replace("pnpm dlx ", "");
				switch (manager) {
					case "npm":
						return `npx ${cmd}`;
					case "yarn":
						return `yarn dlx ${cmd}`;
					case "bun":
						return `bunx ${cmd}`;
					default:
						return line;
				}
			}

			return line;
		})
		.join("\n");
}

interface CodeBlockProps {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
	showPackageSwitcher?: boolean;
}

export function CodeBlock({
	code,
	language = "tsx",
	showPackageSwitcher,
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const [selectedManager, setSelectedManager] = useState<PackageManager>("pnpm");

	// Auto-detect if we should show package switcher for bash commands
	const isBashWithPackageCmd =
		language === "bash" &&
		(code.includes("pnpm add") ||
			code.includes("pnpm install") ||
			code.includes("pnpm dlx") ||
			code.includes("pnpm i"));

	const shouldShowSwitcher = showPackageSwitcher ?? isBashWithPackageCmd;
	const displayCode = shouldShowSwitcher
		? convertCommand(code, selectedManager)
		: code;

	const copyToClipboard = useCallback(() => {
		navigator.clipboard.writeText(displayCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [displayCode]);

	return (
		<div className="relative group rounded-xl overflow-hidden">
			{/* Header */}
			{shouldShowSwitcher && (
				<div className="flex items-center justify-between px-4 py-3 bg-white/4 border-b border-white/8">
					<div className="flex items-center gap-4">
						<div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/8">
							<Terminal size={14} className="text-white/64" />
						</div>
						<div className="flex items-center gap-1">
							{packageManagers.map((manager) => (
								<button
									key={manager}
									type="button"
									onClick={() => setSelectedManager(manager)}
									className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
										selectedManager === manager
											? "bg-white/12 text-white/88"
											: "text-white/48 hover:text-white/72"
									}`}
								>
									{manager}
								</button>
							))}
						</div>
					</div>
					<button
						type="button"
						onClick={copyToClipboard}
						className="p-2 text-white/48 hover:text-white/88 hover:bg-white/8 rounded-md transition-colors"
						aria-label={copied ? "Copied" : "Copy to clipboard"}
					>
						{copied ? (
							<Check size={14} strokeWidth={1.5} />
						) : (
							<Copy size={14} strokeWidth={1.5} />
						)}
					</button>
				</div>
			)}

			{/* Code */}
			<div className="relative">
				{!shouldShowSwitcher && (
					<button
						type="button"
						onClick={copyToClipboard}
						className="absolute top-3 right-3 z-10 p-2 text-white/48 hover:text-white/88 hover:bg-white/8 rounded-md transition-colors"
						aria-label={copied ? "Copied" : "Copy to clipboard"}
					>
						{copied ? (
							<Check size={14} strokeWidth={1.5} />
						) : (
							<Copy size={14} strokeWidth={1.5} />
						)}
					</button>
				)}
				<Highlight
					theme={tokyoNight}
					code={displayCode.trim()}
					language={language}
				>
					{({ style, tokens, getLineProps, getTokenProps }) => (
						<pre
							className="p-4 overflow-x-auto text-[13px] leading-6 m-0 bg-white/4"
							style={{ ...style, backgroundColor: undefined }}
						>
							{tokens.map((line, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: tokens are stable and never reordered
								<div key={i} {...getLineProps({ line })}>
									{line.map((token, key) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: tokens are stable and never reordered
										<span key={key} {...getTokenProps({ token })} />
									))}
								</div>
							))}
						</pre>
					)}
				</Highlight>
			</div>
		</div>
	);
}
