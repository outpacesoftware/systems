import { CodeBlock, TableOfContents } from "@/components/docs";
import type { TOCItem } from "@/components/docs/TableOfContents";

const tocItems: TOCItem[] = [
	{ id: "install", title: "Install" },
	{ id: "requirements", title: "Requirements" },
	{ id: "import", title: "Import" },
	{ id: "styles", title: "Styles" },
	{ id: "typescript", title: "TypeScript" },
];

export default function InstallationPage() {
	return (
		<>
			<TableOfContents items={tocItems} />
			<div className="max-w-3xl pb-16">
				<h1 className="text-4xl font-bold text-white/88 mb-4">Installation</h1>
				<p className="text-[15px] leading-5 text-white/72 mb-8 tracking-[0.12px]">
					Get started with @outpacesoftware/systems in your React project.
				</p>

				<section className="mb-12">
					<h2
						id="install"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Install the package
					</h2>
					<CodeBlock
						code={`# npm
npm install @outpacesoftware/systems

# pnpm
pnpm add @outpacesoftware/systems

# yarn
yarn add @outpacesoftware/systems`}
						language="bash"
					/>
				</section>

				<section className="mb-12">
					<h2
						id="requirements"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Requirements
					</h2>
					<ul className="space-y-2 text-[13px] leading-4 text-white/72 tracking-[0.12px]">
						<li>React 18 or higher</li>
						<li>React DOM 18 or higher</li>
					</ul>
				</section>

				<section className="mb-12">
					<h2
						id="import"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Import components
					</h2>
					<CodeBlock
						code={`// Import individual components
import { Button, Input, Dialog } from '@outpacesoftware/systems';

// Or import from primitives
import { Button } from '@outpacesoftware/systems/primitives/Button';

// Import hooks for custom implementations
import { useButton, useDialog } from '@outpacesoftware/systems';`}
						language="tsx"
					/>
				</section>

				<section className="mb-12">
					<h2
						id="styles"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Add your styles
					</h2>
					<p className="text-[13px] leading-4 text-white/72 mb-4 tracking-[0.12px]">
						Components are unstyled by default. Use data attributes for styling:
					</p>
					<CodeBlock
						code={`/* Tailwind CSS */
<Button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
  Save
</Button>

/* Using data attributes for states */
.my-button[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.my-button[data-loading] {
  /* loading styles */
}

.my-input[data-error] {
  border-color: red;
}`}
						language="tsx"
					/>
				</section>

				<section>
					<h2
						id="typescript"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						TypeScript
					</h2>
					<p className="text-[13px] leading-4 text-white/72 mb-4 tracking-[0.12px]">
						Full TypeScript support out of the box. All components and hooks are
						fully typed.
					</p>
					<CodeBlock
						code={`import { Button, type ButtonProps } from '@outpacesoftware/systems';
import { useButton, type UseButtonProps } from '@outpacesoftware/systems';

// Extend component props
interface MyButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}`}
						language="tsx"
					/>
				</section>
			</div>
		</>
	);
}
