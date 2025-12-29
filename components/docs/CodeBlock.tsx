"use client";

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

interface CodeBlockProps {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
}

export function CodeBlock({
	code,
	language = "tsx",
	showLineNumbers = false,
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = useCallback(() => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [code]);

	return (
		<div className="relative group rounded-lg overflow-hidden border border-white/8">
			<button
				onClick={copyToClipboard}
				className="absolute top-2 right-2 z-10 px-2 py-1 text-[10px] leading-[13px] text-white/48 hover:text-white/88 bg-white/8 hover:bg-white/16 rounded transition-colors tracking-[0.12px] opacity-0 group-hover:opacity-100"
			>
				{copied ? "Copied!" : "Copy"}
			</button>
			<Highlight theme={tokyoNight} code={code.trim()} language={language}>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre
						className="p-4 overflow-x-auto text-[13px] leading-5 m-0 bg-white/8"
						style={{ ...style, backgroundColor: undefined }}
					>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</div>
	);
}
