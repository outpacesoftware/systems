import { CodeBlock } from "@/components/docs";

export default function InstallationPage() {
	return (
		<div className="max-w-3xl">
			<h1 className="text-4xl font-bold text-white/88 mb-4">Installation</h1>
			<p className="text-[15px] leading-5 text-white/72 mb-8 tracking-[0.12px]">
				Get started with @outpacesoftware/systems in your React project.
			</p>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
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
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
					Requirements
				</h2>
				<ul className="space-y-2 text-[13px] leading-4 text-white/72 tracking-[0.12px]">
					<li>React 18 or higher</li>
					<li>React DOM 18 or higher</li>
				</ul>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
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
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
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
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
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
	);
}
