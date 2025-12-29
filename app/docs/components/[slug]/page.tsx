import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock, ComponentDemo, PropsTable } from "@/components/docs";
import { getComponentNames, getManifest } from "@/lib/registry";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const names = getComponentNames();
	return names.map((name) => ({ slug: name.toLowerCase() }));
}

export default async function ComponentPage({ params }: PageProps) {
	const { slug } = await params;
	const manifest = getManifest(slug);

	if (!manifest) {
		notFound();
	}

	return (
		<div className="max-w-4xl">
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
				<h2 className="text-xl font-semibold text-white/88 mb-4">Preview</h2>
				<ComponentDemo name={manifest.name} />
			</section>

			{/* Installation */}
			<section className="mb-12">
				<h2 className="text-xl font-semibold text-white/88 mb-4">
					Installation
				</h2>
				<CodeBlock
					code={`pnpm add @outpacesoftware/systems`}
					language="bash"
				/>
			</section>

			{/* Import */}
			<section className="mb-12">
				<h2 className="text-xl font-semibold text-white/88 mb-4">Import</h2>
				<CodeBlock
					code={`import { ${manifest.name} } from '@outpacesoftware/systems/${manifest.name}';`}
					language="tsx"
				/>
			</section>

			{/* Examples */}
			<section className="mb-12">
				<h2 className="text-xl font-semibold text-white/88 mb-4">Examples</h2>
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
				<h2 className="text-xl font-semibold text-white/88 mb-4">Props</h2>
				<PropsTable props={manifest.props} />
			</section>

			{/* Slots (for composed components) */}
			{manifest.slots && Object.keys(manifest.slots).length > 0 && (
				<section className="mb-12">
					<h2 className="text-xl font-semibold text-white/88 mb-4">Slots</h2>
					<div className="space-y-4">
						{Object.entries(manifest.slots).map(([name, slot]) => (
							<div key={name} className="p-4 rounded-lg border border-white/8">
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

			{/* Accessibility */}
			<section className="mb-12">
				<h2 className="text-xl font-semibold text-white/88 mb-4">
					Accessibility
				</h2>
				<div className="space-y-4 text-[13px] leading-4 tracking-[0.12px]">
					{manifest.accessibility.role && (
						<div>
							<span className="text-white/48">Role: </span>
							<code className="text-blue-400">
								{manifest.accessibility.role}
							</code>
						</div>
					)}
					{manifest.accessibility.keyboard &&
						manifest.accessibility.keyboard.length > 0 && (
							<div>
								<span className="text-white/48">Keyboard: </span>
								<span className="text-white/72">
									{manifest.accessibility.keyboard.join(", ")}
								</span>
							</div>
						)}
					{manifest.accessibility.focusManagement && (
						<div>
							<span className="text-white/48">Focus: </span>
							<span className="text-white/72">
								{manifest.accessibility.focusManagement}
							</span>
						</div>
					)}
					{manifest.accessibility.screenReader && (
						<div>
							<span className="text-white/48">Screen reader: </span>
							<span className="text-white/72">
								{manifest.accessibility.screenReader}
							</span>
						</div>
					)}
				</div>
			</section>

			{/* Related */}
			{manifest.relatedComponents && manifest.relatedComponents.length > 0 && (
				<section>
					<h2 className="text-xl font-semibold text-white/88 mb-4">
						Related Components
					</h2>
					<div className="flex gap-2">
						{manifest.relatedComponents.map((name) => (
							<Link
								key={name}
								href={`/docs/components/${name.toLowerCase()}`}
								className="text-[13px] leading-4 px-3 py-1.5 rounded-md bg-white/8 text-white/72 hover:text-white/88 hover:bg-white/12 transition-colors tracking-[0.12px]"
							>
								{name}
							</Link>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
