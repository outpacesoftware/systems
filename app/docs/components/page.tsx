import Link from "next/link";
import { type ComponentManifest, getRegistry } from "@/lib/registry";

export default function ComponentsIndexPage() {
	const registry = getRegistry();

	// Group by category
	const byCategory = registry.components.reduce(
		(
			acc: Record<string, ComponentManifest[]>,
			component: ComponentManifest,
		) => {
			const category = component.category;
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(component);
			return acc;
		},
		{} as Record<string, ComponentManifest[]>,
	);

	const categoryLabels: Record<string, string> = {
		action: "Action",
		form: "Form",
		overlay: "Overlay",
		feedback: "Feedback",
		navigation: "Navigation",
		layout: "Layout",
		display: "Display",
	};

	return (
		<div className="max-w-4xl">
			<h1 className="text-4xl font-bold text-white/88 mb-4">Components</h1>
			<p className="text-[15px] leading-5 text-white/72 mb-8 tracking-[0.12px]">
				Headless, accessible components for building modern UIs.
			</p>

			{(Object.entries(byCategory) as [string, ComponentManifest[]][]).map(
				([category, components]) => (
					<section key={category} className="mb-12">
						<h2 className="text-2xl font-semibold text-white/88 mb-4">
							{categoryLabels[category] || category}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{components.map((component) => (
								<Link
									key={component.name}
									href={`/docs/components/${component.name.toLowerCase()}`}
									className="block p-4 rounded-lg border border-white/8 hover:border-white/12 hover:bg-white/4 transition-colors"
								>
									<h3 className="text-[15px] leading-5 font-medium text-white/88 mb-1 tracking-[0.12px]">
										{component.displayName}
									</h3>
									<p className="text-[13px] leading-4 text-white/48 tracking-[0.12px]">
										{component.description}
									</p>
									<div className="flex gap-2 mt-2">
										{component.tags.slice(0, 3).map((tag) => (
											<span
												key={tag}
												className="text-[10px] leading-[13px] px-2 py-0.5 rounded bg-white/8 text-white/48 tracking-[0.12px]"
											>
												{tag}
											</span>
										))}
									</div>
								</Link>
							))}
						</div>
					</section>
				),
			)}
		</div>
	);
}
