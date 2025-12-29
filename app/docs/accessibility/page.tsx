"use client";

import { CodeBlock } from "@/components/docs/CodeBlock";

export default function AccessibilityPage() {
	return (
		<div className="max-w-4xl">
			<h1 className="text-4xl font-bold text-white/88 mb-4">Accessibility</h1>
			<p className="text-[15px] leading-6 text-white/72 mb-12 tracking-[0.12px]">
				@outpacesoftware/systems is built with accessibility as a core
				principle. All components follow WAI-ARIA guidelines and include
				comprehensive keyboard navigation.
			</p>

			{/* Utilities */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Accessibility Utilities
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					Import these utilities from the main package to enhance accessibility
					in your application.
				</p>

				{/* useReducedMotion */}
				<div className="mb-8">
					<h3 className="text-lg font-medium text-white/88 mb-3">
						useReducedMotion
					</h3>
					<p className="text-[13px] leading-5 text-white/64 mb-4 tracking-[0.12px]">
						Detects if the user prefers reduced motion. Use this to disable
						animations for users who have enabled the &quot;Reduce motion&quot;
						setting in their operating system.
					</p>
					<CodeBlock
						language="tsx"
						code={`import { useReducedMotion } from '@outpacesoftware/systems';

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={prefersReducedMotion
        ? 'transition-none'
        : 'transition-all duration-300'
      }
    >
      Content
    </div>
  );
}`}
					/>
				</div>

				{/* VisuallyHidden */}
				<div className="mb-8">
					<h3 className="text-lg font-medium text-white/88 mb-3">
						VisuallyHidden
					</h3>
					<p className="text-[13px] leading-5 text-white/64 mb-4 tracking-[0.12px]">
						Renders content that is visually hidden but accessible to screen
						readers. Useful for providing additional context without affecting
						visual design.
					</p>
					<CodeBlock
						language="tsx"
						code={`import { VisuallyHidden } from '@outpacesoftware/systems';

// Icon button with accessible label
<button>
  <SearchIcon />
  <VisuallyHidden>Search</VisuallyHidden>
</button>

// Skip link (focusable when tabbed to)
<VisuallyHidden focusable>
  <a href="#main-content">Skip to main content</a>
</VisuallyHidden>`}
					/>
				</div>

				{/* useFocusTrap */}
				<div className="mb-8">
					<h3 className="text-lg font-medium text-white/88 mb-3">
						useFocusTrap
					</h3>
					<p className="text-[13px] leading-5 text-white/64 mb-4 tracking-[0.12px]">
						Traps focus within a container element. Essential for modals,
						dialogs, and other overlay components. Handles Tab cycling and
						Escape key.
					</p>
					<CodeBlock
						language="tsx"
						code={`import { useFocusTrap } from '@outpacesoftware/systems';

function Modal({ isOpen, onClose }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap(containerRef, {
    enabled: isOpen,
    onEscape: onClose,
    // Optional: specify initial focus element
    initialFocus: closeButtonRef,
  });

  return (
    <div ref={containerRef} role="dialog">
      <button>First focusable</button>
      <button ref={closeButtonRef}>Close</button>
    </div>
  );
}`}
					/>
				</div>

				{/* useAriaLiveAnnouncer */}
				<div className="mb-8">
					<h3 className="text-lg font-medium text-white/88 mb-3">
						useAriaLiveAnnouncer
					</h3>
					<p className="text-[13px] leading-5 text-white/64 mb-4 tracking-[0.12px]">
						Announce messages to screen readers using an aria-live region. Use
						for dynamic content updates, form validation, and notifications.
					</p>
					<CodeBlock
						language="tsx"
						code={`import { useAriaLiveAnnouncer } from '@outpacesoftware/systems';

function SearchResults({ results }) {
  const { announce } = useAriaLiveAnnouncer();

  useEffect(() => {
    announce(\`\${results.length} results found\`);
  }, [results, announce]);

  return <ul>{/* results */}</ul>;
}

// For errors, use assertive politeness
const { announce } = useAriaLiveAnnouncer({
  politeness: 'assertive'
});
announce('Error: Invalid email address');`}
					/>
				</div>
			</section>

			{/* Keyboard Navigation */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Keyboard Navigation
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					All components support full keyboard navigation following WAI-ARIA
					patterns.
				</p>

				<div className="space-y-4">
					<div className="bg-white/4 border border-white/8 rounded-lg p-4">
						<h3 className="text-[13px] leading-4 font-medium text-white/88 mb-2">
							Dialog / AlertDialog
						</h3>
						<ul className="text-[13px] leading-5 text-white/64 space-y-1">
							<li>
								<code className="text-green-400">Tab</code> - Move focus between
								focusable elements
							</li>
							<li>
								<code className="text-green-400">Shift + Tab</code> - Move focus
								backwards
							</li>
							<li>
								<code className="text-green-400">Escape</code> - Close the
								dialog
							</li>
						</ul>
					</div>

					<div className="bg-white/4 border border-white/8 rounded-lg p-4">
						<h3 className="text-[13px] leading-4 font-medium text-white/88 mb-2">
							Menu / NavigationMenu
						</h3>
						<ul className="text-[13px] leading-5 text-white/64 space-y-1">
							<li>
								<code className="text-green-400">Arrow Down</code> - Move to
								next item
							</li>
							<li>
								<code className="text-green-400">Arrow Up</code> - Move to
								previous item
							</li>
							<li>
								<code className="text-green-400">Home</code> - Move to first
								item
							</li>
							<li>
								<code className="text-green-400">End</code> - Move to last item
							</li>
							<li>
								<code className="text-green-400">Enter / Space</code> - Select
								item
							</li>
							<li>
								<code className="text-green-400">Escape</code> - Close menu
							</li>
						</ul>
					</div>

					<div className="bg-white/4 border border-white/8 rounded-lg p-4">
						<h3 className="text-[13px] leading-4 font-medium text-white/88 mb-2">
							Tabs
						</h3>
						<ul className="text-[13px] leading-5 text-white/64 space-y-1">
							<li>
								<code className="text-green-400">Arrow Left/Right</code> -
								Switch tabs (horizontal)
							</li>
							<li>
								<code className="text-green-400">Arrow Up/Down</code> - Switch
								tabs (vertical)
							</li>
							<li>
								<code className="text-green-400">Home</code> - First tab
							</li>
							<li>
								<code className="text-green-400">End</code> - Last tab
							</li>
						</ul>
					</div>

					<div className="bg-white/4 border border-white/8 rounded-lg p-4">
						<h3 className="text-[13px] leading-4 font-medium text-white/88 mb-2">
							Slider
						</h3>
						<ul className="text-[13px] leading-5 text-white/64 space-y-1">
							<li>
								<code className="text-green-400">Arrow Left/Down</code> -
								Decrease value
							</li>
							<li>
								<code className="text-green-400">Arrow Right/Up</code> -
								Increase value
							</li>
							<li>
								<code className="text-green-400">Page Down</code> - Decrease by
								larger step
							</li>
							<li>
								<code className="text-green-400">Page Up</code> - Increase by
								larger step
							</li>
							<li>
								<code className="text-green-400">Home</code> - Set to minimum
							</li>
							<li>
								<code className="text-green-400">End</code> - Set to maximum
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* ARIA Patterns */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					ARIA Patterns
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					Components automatically apply appropriate ARIA attributes. Here are
					the key patterns used:
				</p>

				<div className="overflow-x-auto">
					<table className="w-full text-[13px] leading-5">
						<thead>
							<tr className="border-b border-white/8">
								<th className="text-left py-3 pr-4 text-white/88 font-medium">
									Component
								</th>
								<th className="text-left py-3 pr-4 text-white/88 font-medium">
									ARIA Role
								</th>
								<th className="text-left py-3 text-white/88 font-medium">
									Key Attributes
								</th>
							</tr>
						</thead>
						<tbody className="text-white/64">
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">Dialog</td>
								<td className="py-3 pr-4">
									<code className="text-green-400">dialog</code>
								</td>
								<td className="py-3">
									aria-modal, aria-labelledby, aria-describedby
								</td>
							</tr>
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">AlertDialog</td>
								<td className="py-3 pr-4">
									<code className="text-green-400">alertdialog</code>
								</td>
								<td className="py-3">
									aria-modal, aria-labelledby, aria-describedby
								</td>
							</tr>
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">Menu</td>
								<td className="py-3 pr-4">
									<code className="text-green-400">menu</code>
								</td>
								<td className="py-3">aria-labelledby, aria-expanded</td>
							</tr>
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">Tabs</td>
								<td className="py-3 pr-4">
									<code className="text-green-400">tablist</code>
								</td>
								<td className="py-3">aria-selected, aria-controls</td>
							</tr>
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">Tooltip</td>
								<td className="py-3 pr-4">
									<code className="text-green-400">tooltip</code>
								</td>
								<td className="py-3">aria-describedby, aria-expanded</td>
							</tr>
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">Switch</td>
								<td className="py-3 pr-4">
									<code className="text-green-400">switch</code>
								</td>
								<td className="py-3">aria-checked</td>
							</tr>
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">Slider</td>
								<td className="py-3 pr-4">
									<code className="text-green-400">slider</code>
								</td>
								<td className="py-3">
									aria-valuenow, aria-valuemin, aria-valuemax
								</td>
							</tr>
							<tr>
								<td className="py-3 pr-4">Progress</td>
								<td className="py-3 pr-4">
									<code className="text-green-400">progressbar</code>
								</td>
								<td className="py-3">
									aria-valuenow, aria-valuemin, aria-valuemax
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* Field Component */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Form Field Accessibility
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					Use the Field primitive for consistent form accessibility. It
					automatically connects labels, descriptions, and error messages to
					form controls.
				</p>

				<CodeBlock
					language="tsx"
					code={`import { Primitives } from '@outpacesoftware/systems';

const { Field } = Primitives;

<Field.Root hasError={!!error} required>
  <Field.Label>Email address</Field.Label>
  <Field.Control>
    <input {...useFieldProps()} type="email" />
  </Field.Control>
  <Field.Description>
    We'll never share your email.
  </Field.Description>
  <Field.Error>{error}</Field.Error>
</Field.Root>

// The useFieldProps hook provides:
// - id (connected to label's htmlFor)
// - aria-labelledby (connected to label)
// - aria-describedby (connected to description + error)
// - aria-invalid (when hasError is true)
// - aria-errormessage (when hasError is true)
// - aria-required (when required is true)
// - disabled (when disabled is true)`}
				/>
			</section>

			{/* Testing */}
			<section>
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Testing Accessibility
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					Recommended tools and approaches for testing accessibility:
				</p>

				<ul className="space-y-3 text-[13px] leading-5 text-white/64">
					<li className="flex gap-3">
						<span className="text-green-400">1.</span>
						<span>
							<strong className="text-white/88">Keyboard testing</strong> -
							Navigate your app using only keyboard
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-green-400">2.</span>
						<span>
							<strong className="text-white/88">Screen reader testing</strong> -
							Test with VoiceOver (Mac), NVDA (Windows), or JAWS
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-green-400">3.</span>
						<span>
							<strong className="text-white/88">axe DevTools</strong> - Browser
							extension for automated accessibility audits
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-green-400">4.</span>
						<span>
							<strong className="text-white/88">Lighthouse</strong> - Built into
							Chrome DevTools
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-green-400">5.</span>
						<span>
							<strong className="text-white/88">Color contrast checker</strong>{" "}
							- Ensure text meets WCAG contrast requirements
						</span>
					</li>
				</ul>
			</section>
		</div>
	);
}
