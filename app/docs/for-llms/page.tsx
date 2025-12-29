import { CodeBlock } from '@/components/docs';

export default function ForLLMsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-white/88 mb-4">For LLMs</h1>
      <p className="text-[15px] leading-5 text-white/72 mb-8 tracking-[0.12px]">
        This design system is optimized for AI consumption. Query components,
        get usage examples, and build UIs programmatically.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white/88 mb-4">API Endpoints</h2>

        <h3 className="text-[15px] leading-5 font-medium text-white/88 mb-2 mt-6 tracking-[0.12px]">
          Query Components
        </h3>
        <CodeBlock
          code={`GET /api/design-system/query?semantic=show+status
GET /api/design-system/query?category=form
GET /api/design-system/query?tags=input,form`}
          language="bash"
        />

        <h3 className="text-[15px] leading-5 font-medium text-white/88 mb-2 mt-6 tracking-[0.12px]">
          Get Component Details
        </h3>
        <CodeBlock
          code={`GET /api/design-system/query?name=Button
GET /api/design-system/query?name=Button&format=llm`}
          language="bash"
        />

        <h3 className="text-[15px] leading-5 font-medium text-white/88 mb-2 mt-6 tracking-[0.12px]">
          Full Manifest
        </h3>
        <CodeBlock
          code={`GET /api/design-system/manifest`}
          language="bash"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white/88 mb-4">
          Component Categories
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] leading-4 tracking-[0.12px]">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left py-3 px-4 text-white/72 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-white/72 font-medium">Components</th>
                <th className="text-left py-3 px-4 text-white/72 font-medium">Use For</th>
              </tr>
            </thead>
            <tbody className="text-white/72">
              <tr className="border-b border-white/4">
                <td className="py-3 px-4">action</td>
                <td className="py-3 px-4">Button</td>
                <td className="py-3 px-4">Triggering actions</td>
              </tr>
              <tr className="border-b border-white/4">
                <td className="py-3 px-4">form</td>
                <td className="py-3 px-4">Input, Checkbox, Switch, Select</td>
                <td className="py-3 px-4">Collecting user input</td>
              </tr>
              <tr className="border-b border-white/4">
                <td className="py-3 px-4">overlay</td>
                <td className="py-3 px-4">Dialog, Tooltip</td>
                <td className="py-3 px-4">Modals, popups, hints</td>
              </tr>
              <tr className="border-b border-white/4">
                <td className="py-3 px-4">feedback</td>
                <td className="py-3 px-4">Toast, Progress</td>
                <td className="py-3 px-4">Status, notifications</td>
              </tr>
              <tr className="border-b border-white/4">
                <td className="py-3 px-4">navigation</td>
                <td className="py-3 px-4">Tabs, Menu</td>
                <td className="py-3 px-4">Navigation controls</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white/88 mb-4">
          Common Patterns
        </h2>

        <h3 className="text-[15px] leading-5 font-medium text-white/88 mb-2 mt-6 tracking-[0.12px]">
          Form with validation
        </h3>
        <CodeBlock
          code={`<form onSubmit={handleSubmit}>
  <Input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={!!errors.email}
    aria-describedby="email-error"
  />
  {errors.email && <span id="email-error">{errors.email}</span>}

  <Checkbox checked={agreed} onChange={setAgreed} />

  <Button type="submit" loading={isSubmitting}>
    Submit
  </Button>
</form>`}
          language="tsx"
        />

        <h3 className="text-[15px] leading-5 font-medium text-white/88 mb-2 mt-6 tracking-[0.12px]">
          Confirmation dialog
        </h3>
        <CodeBlock
          code={`<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Portal>
    <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-6 rounded-lg">
      <Dialog.Title>Delete item?</Dialog.Title>
      <Dialog.Description>This action cannot be undone.</Dialog.Description>
      <div className="flex gap-2 mt-4">
        <Dialog.Close>Cancel</Dialog.Close>
        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white/88 mb-4">
          Decision Tree
        </h2>
        <div className="space-y-2 text-[13px] leading-4 text-white/72 tracking-[0.12px]">
          <p>
            <strong className="text-white/88">Need to trigger an action?</strong>{' '}
            Button
          </p>
          <p>
            <strong className="text-white/88">Need text input?</strong>{' '}
            Input
          </p>
          <p>
            <strong className="text-white/88">Need boolean selection?</strong>{' '}
            Checkbox (form) or Switch (immediate effect)
          </p>
          <p>
            <strong className="text-white/88">Need to select from options?</strong>{' '}
            Select (dropdown) or RadioGroup (visible options)
          </p>
          <p>
            <strong className="text-white/88">Need focused user attention?</strong>{' '}
            Dialog
          </p>
          <p>
            <strong className="text-white/88">Need contextual hints?</strong>{' '}
            Tooltip
          </p>
        </div>
      </section>
    </div>
  );
}
