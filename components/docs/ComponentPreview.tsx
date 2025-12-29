"use client";

import { type ReactNode, useState } from "react";
import { CodeBlock } from "./CodeBlock";

interface ComponentPreviewProps {
	children: ReactNode;
	code: string;
	title?: string;
}

export function ComponentPreview({
	children,
	code,
	title,
}: ComponentPreviewProps) {
	const [showCode, setShowCode] = useState(false);

	return (
		<div className="rounded-lg border border-white/8 overflow-hidden">
			{title && (
				<div className="px-4 py-2 border-b border-white/8 bg-white/4">
					<span className="text-[13px] leading-4 text-white/72 tracking-[0.12px]">
						{title}
					</span>
				</div>
			)}

			{/* Preview */}
			<div className="p-8 bg-white/2 flex items-center justify-center min-h-[120px]">
				{children}
			</div>

			{/* Toggle & Code */}
			<div className="border-t border-white/8">
				<button
					onClick={() => setShowCode(!showCode)}
					className="w-full px-4 py-2 text-[10px] leading-[13px] text-white/48 hover:text-white/88 hover:bg-white/4 transition-colors text-left tracking-[0.12px]"
				>
					{showCode ? "Hide code" : "Show code"}
				</button>

				{showCode && (
					<div className="border-t border-white/8">
						<CodeBlock code={code} />
					</div>
				)}
			</div>
		</div>
	);
}
