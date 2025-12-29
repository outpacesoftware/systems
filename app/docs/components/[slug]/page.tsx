import { notFound } from "next/navigation";
import {
	CodeBlock,
	ComponentDemo,
	PropsTable,
	TableOfContents,
} from "@/components/docs";
import type { TOCItem } from "@/components/docs/TableOfContents";
import { getComponentNames, getManifest, toKebabCase } from "@/lib/registry";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const names = getComponentNames();
	return names.map((name) => ({ slug: toKebabCase(name) }));
}

export default async function ComponentPage({ params }: PageProps) {
	const { slug } = await params;
	const manifest = getManifest(slug);

	if (!manifest) {
		notFound();
	}

	const tocItems: TOCItem[] = [
		{ id: "preview", title: "Preview" },
		{ id: "installation", title: "Installation" },
		{ id: "import", title: "Import" },
		{ id: "examples", title: "Examples" },
		{ id: "props", title: "Props" },
		...(manifest.slots && Object.keys(manifest.slots).length > 0
			? [{ id: "slots", title: "Slots" }]
			: []),
	];

	return (
		<>
			<TableOfContents items={tocItems} />
			<div className="pb-16">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-white/88 mb-2">
						{manifest.displayName}
					</h1>
					<p className="text-[15px] leading-5 text-white/72 tracking-[0.12px]">
						{manifest.description}
					</p>
				</div>

				{/* Live Demo */}
				<section className="mb-12">
					<h2
						id="preview"
						className="text-xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Preview
					</h2>
					<ComponentDemo name={manifest.name} />
				</section>

				{/* Installation */}
				<section className="mb-12">
					<h2
						id="installation"
						className="text-xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Installation
					</h2>
					<CodeBlock
						code={`pnpm add @outpacesoftware/systems`}
						language="bash"
					/>
				</section>

				{/* Import */}
				<section className="mb-12">
					<h2
						id="import"
						className="text-xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Import
					</h2>
					<CodeBlock
						code={`import { ${manifest.name} } from "@outpacesoftware/systems/${manifest.name}";`}
						language="tsx"
					/>
				</section>

				{/* Examples */}
				<section className="mb-12">
					<h2
						id="examples"
						className="text-xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Examples
					</h2>
					<div className="space-y-6">
						{manifest.examples.map((example) => (
							<div key={example.name}>
								<h3 className="text-[13px] leading-4 font-medium text-white/88 mb-2 tracking-[0.12px]">
									{example.name}
								</h3>
								{example.description && (
									<p className="text-[13px] leading-4 text-white/48 mb-2 tracking-[0.12px]">
										{example.description}
									</p>
								)}
								<CodeBlock code={example.code} language="tsx" />
							</div>
						))}
					</div>
				</section>

				{/* Props */}
				<section className="mb-12">
					<h2
						id="props"
						className="text-xl font-semibold text-white/88 mb-4 scroll-mt-20"
					>
						Props
					</h2>
					<PropsTable props={manifest.props} />
				</section>

				{/* Slots (for composed components) */}
				{manifest.slots && Object.keys(manifest.slots).length > 0 && (
					<section className="mb-12">
						<h2
							id="slots"
							className="text-xl font-semibold text-white/88 mb-4 scroll-mt-20"
						>
							Slots
						</h2>
						<div className="space-y-4">
							{Object.entries(manifest.slots).map(([name, slot]) => (
								<div
									key={name}
									className="p-4 rounded-lg border border-white/8"
								>
									<h3 className="text-[13px] leading-4 font-medium text-white/88 mb-1 tracking-[0.12px]">
										{manifest.name}.{name}
									</h3>
									<p className="text-[13px] leading-4 text-white/48 tracking-[0.12px]">
										{slot.description}
									</p>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</>
	);
}
