import { CodeBlock, TableOfContents } from "@/components/docs";
import type { TOCItem } from "@/components/docs/TableOfContents";

const tocItems: TOCItem[] = [
	{ id: "installation", title: "Installation" },
	{ id: "commands", title: "Commands" },
	{ id: "quick-start", title: "Quick Start" },
];

export default function CLIPage() {
	return (
		<>
			<TableOfContents items={tocItems} />
			<div className="max-w-3xl pb-16">
				<h1 className="text-4xl font-bold text-white/88 mb-4">CLI</h1>
				<p className="text-[15px] leading-5 text-white/72 mb-8 tracking-[0.12px]">
					Command-line interface for @outpacesoftware/systems.
				</p>

				<section className="mb-12">
					<h2
						id="installation"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Installation
					</h2>
					<CodeBlock code="npm install -g outpacesystems" language="bash" />
				</section>

				<section className="mb-12">
					<h2
						id="commands"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Commands
					</h2>

					<div className="space-y-8">
						<div>
							<h3 className="text-lg font-medium text-white/88 mb-2">init</h3>
							<p className="text-[13px] leading-5 text-white/72 mb-3 tracking-[0.12px]">
								Initialize the design system in your project. Detects your
								package manager and installs @outpacesoftware/systems.
							</p>
							<CodeBlock code="outpacesystems init" language="bash" />
							<div className="mt-3 text-[13px] leading-5 text-white/48 tracking-[0.12px]">
								<p className="mb-1">Options:</p>
								<ul className="list-disc list-inside space-y-1">
									<li>
										<code className="text-white/64">-y, --yes</code> — Skip
										prompts and use defaults
									</li>
								</ul>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium text-white/88 mb-2">add</h3>
							<p className="text-[13px] leading-5 text-white/72 mb-3 tracking-[0.12px]">
								Install components to your project. Downloads component source
								files from the registry and saves them to your project.
							</p>
							<CodeBlock
								code={`# Interactive selection
outpacesystems add

# Add specific components
outpacesystems add Button Dialog Toast

# Add all components
outpacesystems add --all

# Custom output directory
outpacesystems add Button --path src/components`}
								language="bash"
							/>
							<div className="mt-3 text-[13px] leading-5 text-white/48 tracking-[0.12px]">
								<p className="mb-1">Options:</p>
								<ul className="list-disc list-inside space-y-1">
									<li>
										<code className="text-white/64">-y, --yes</code> — Skip
										prompts
									</li>
									<li>
										<code className="text-white/64">-a, --all</code> — Add all
										components
									</li>
									<li>
										<code className="text-white/64">-p, --path</code> — Output
										directory (default: components/ui)
									</li>
								</ul>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium text-white/88 mb-2">list</h3>
							<p className="text-[13px] leading-5 text-white/72 mb-3 tracking-[0.12px]">
								List all available components with descriptions.
							</p>
							<CodeBlock code="outpacesystems list" language="bash" />
						</div>

						<div>
							<h3 className="text-lg font-medium text-white/88 mb-2">doctor</h3>
							<p className="text-[13px] leading-5 text-white/72 mb-3 tracking-[0.12px]">
								Check your project setup and dependencies. Verifies that all
								required packages are installed.
							</p>
							<CodeBlock code="outpacesystems doctor" language="bash" />
						</div>
					</div>
				</section>

				<section className="mb-12">
					<h2
						id="quick-start"
						className="text-2xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Quick Start
					</h2>
					<CodeBlock
						code={`# Initialize in your project
outpacesystems init

# Check setup
outpacesystems doctor

# Add components
outpacesystems add Button Dialog

# See all available components
outpacesystems list`}
						language="bash"
					/>
				</section>
			</div>
		</>
	);
}
