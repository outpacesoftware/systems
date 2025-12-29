import { CodeBlock, TableOfContents } from "@/components/docs";
import type { TOCItem } from "@/components/docs/TableOfContents";

const tocItems: TOCItem[] = [
	{ id: "features", title: "Features" },
	{ id: "quick-start", title: "Quick Start" },
	{ id: "usage", title: "Usage" },
];

export default function DocsPage() {
	return (
		<>
			<TableOfContents items={tocItems} />
			<div className="max-w-3xl pb-16">
				<h1 className="text-4xl font-bold text-white mb-4">Introduction</h1>
				<p className="text-[15px] leading-6 text-white/72 mb-8 tracking-[0.12px]">
					An accessible design system with composable components for React.
				</p>

				<section className="mb-12">
					<h2
						id="features"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Features
					</h2>
					<ul className="space-y-3 text-white/72 text-[13px] leading-5 tracking-[0.12px]">
						<li className="flex items-start gap-2">
							<span className="text-green-400">+</span>
							<span>
								<strong className="text-white/88">Accessible</strong> - WAI-ARIA
								patterns, keyboard navigation, focus management, screen reader
								support
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-green-400">+</span>
							<span>
								<strong className="text-white/88">Composable</strong> - Compound
								components that compose into complex UIs
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-green-400">+</span>
							<span>
								<strong className="text-white/88">Tree-Shakeable</strong> -
								Import individual components to minimize bundle size
							</span>
						</li>
					</ul>
				</section>

				<section className="mb-12">
					<h2
						id="quick-start"
						className="text-2xl font-semibold text-white mb-4 scroll-mt-20"
					>
						Quick Start
					</h2>
					<CodeBlock
						code={`pnpm add @outpacesoftware/systems`}
						language="bash"
					/>
				</section>

				<section className="mb-12">
					<h2
						id="usage"
						className="text-2xl font-semibold text-white mb-4 scroll-mt-20"
					>
						Usage
					</h2>
					<CodeBlock
						code={`import { Button } from "@outpacesoftware/systems/Button";
import { Dialog } from "@outpacesoftware/systems/Dialog";
import { Tooltip } from "@outpacesoftware/systems/Tooltip";

// Compound component pattern
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 ...">
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.Description>Are you sure?</Dialog.Description>
      <Dialog.Close>Cancel</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

// Full keyboard and screen reader support built in
<Tooltip.Root>
  <Tooltip.Trigger>Hover or focus me</Tooltip.Trigger>
  <Tooltip.Content>Helpful information</Tooltip.Content>
</Tooltip.Root>`}
						language="tsx"
					/>
				</section>
			</div>
		</>
	);
}
