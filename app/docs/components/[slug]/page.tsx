import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getManifest, getComponentNames } from '@/lib/registry';
import { CodeBlock, PropsTable, ComponentDemo } from '@/components/docs';

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
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] leading-[13px] px-2 py-0.5 rounded bg-white/8 text-white/48 tracking-[0.12px]">
            {manifest.category}
          </span>
          {manifest.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] leading-[13px] px-2 py-0.5 rounded bg-white/4 text-white/32 tracking-[0.12px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-white/88 mb-2">
          {manifest.displayName}
        </h1>
        <p className="text-[15px] leading-5 text-white/72 tracking-[0.12px]">{manifest.description}</p>
      </div>

      {/* Live Demo */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white/88 mb-4">Preview</h2>
        <ComponentDemo name={manifest.name} />
      </section>

      {/* Import */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white/88 mb-4">Import</h2>
        <CodeBlock
          code={`import { ${manifest.name} } from '${manifest.importPath}';`}
          language="tsx"
        />
      </section>

      {/* When to use */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white/88 mb-4">When to use</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-[13px] leading-4 font-medium text-green-400 mb-2 tracking-[0.12px]">
              Use when
            </h3>
            <ul className="space-y-1">
              {manifest.useWhen.map((use, i) => (
                <li key={i} className="text-white/72 text-[13px] leading-4 flex gap-2 tracking-[0.12px]">
                  <span className="text-green-400">+</span>
                  {use}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[13px] leading-4 font-medium text-red-400 mb-2 tracking-[0.12px]">
              Don&apos;t use when
            </h3>
            <ul className="space-y-1">
              {manifest.dontUseWhen.map((dont, i) => (
                <li key={i} className="text-white/72 text-[13px] leading-4 flex gap-2 tracking-[0.12px]">
                  <span className="text-red-400">-</span>
                  {dont}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white/88 mb-4">Examples</h2>
        <div className="space-y-6">
          {manifest.examples.map((example, i) => (
            <div key={i}>
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
              <div
                key={name}
                className="p-4 rounded-lg border border-white/8"
              >
                <h3 className="text-[13px] leading-4 font-medium text-white/88 mb-1 tracking-[0.12px]">
                  {manifest.name}.{name}
                </h3>
                <p className="text-[13px] leading-4 text-white/48 tracking-[0.12px]">{slot.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white/88 mb-4">Accessibility</h2>
        <div className="space-y-4 text-[13px] leading-4 tracking-[0.12px]">
          {manifest.accessibility.role && (
            <div>
              <span className="text-white/48">Role: </span>
              <code className="text-blue-400">{manifest.accessibility.role}</code>
            </div>
          )}
          {manifest.accessibility.keyboard &&
            manifest.accessibility.keyboard.length > 0 && (
              <div>
                <span className="text-white/48">Keyboard: </span>
                <span className="text-white/72">
                  {manifest.accessibility.keyboard.join(', ')}
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
