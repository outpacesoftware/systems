import { CodeBlock } from '@/components/docs';

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4">
        @outpace/systems
      </h1>
      <p className="text-[15px] leading-5 text-white/72 mb-8 tracking-[0.12px]">
        An AI-first design system with headless, accessible, LLM-optimized
        components for React.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white/88 mb-4">Features</h2>
        <ul className="space-y-3 text-white/72 text-[13px] leading-4 tracking-[0.12px]">
          <li className="flex items-start gap-2">
            <span className="text-green-400">+</span>
            <span>
              <strong className="text-white/88">Headless</strong> - Unstyled
              components, bring your own CSS
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">+</span>
            <span>
              <strong className="text-white/88">Accessible</strong> - WAI-ARIA
              patterns built in
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">+</span>
            <span>
              <strong className="text-white/88">AI-First</strong> - Component
              manifests for LLM consumption
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">+</span>
            <span>
              <strong className="text-white/88">Composable</strong> - Small
              primitives that compose into complex UIs
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">+</span>
            <span>
              <strong className="text-white/88">Hooks</strong> - useButton,
              useDialog, etc. for custom implementations
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Quick Start
        </h2>
        <CodeBlock
          code={`npm install @outpace/systems

# or
pnpm add @outpace/systems`}
          language="bash"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
        <CodeBlock
          code={`import { Button, Dialog, Tooltip } from '@outpace/systems';

// Style with Tailwind, CSS, or any styling solution
<Button className="px-4 py-2 bg-blue-500 rounded">
  Click me
</Button>

// Composition pattern for complex components
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 ...">
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white/88 mb-4">
          For AI/LLMs
        </h2>
        <p className="text-[13px] leading-4 text-white/72 mb-4 tracking-[0.12px]">
          Query our API to discover and use components programmatically:
        </p>
        <CodeBlock
          code={`// Query by semantic description
GET /api/design-system/query?semantic=show+status

// Get component details
GET /api/design-system/query?name=Button&format=llm

// Full manifest
GET /api/design-system/manifest`}
          language="bash"
        />
      </section>
    </div>
  );
}
