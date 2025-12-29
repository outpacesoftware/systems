import { CodeBlock } from "@/components/docs";

export default function DocsPage() {
	return (
		<div className="max-w-3xl">
			<h1 className="text-4xl font-bold text-white mb-4">
				@outpacesoftware/systems
			</h1>
			<p className="text-[15px] leading-6 text-white/72 mb-8 tracking-[0.12px]">
				An AI-first design system with accessible, LLM-optimized components for
				React.
			</p>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-white/88 mb-4">Features</h2>
				<ul className="space-y-3 text-white/72 text-[13px] leading-5 tracking-[0.12px]">
					<li className="flex items-start gap-2">
						<span className="text-green-400">+</span>
						<span>
							<strong className="text-white/88">Accessible</strong> - WAI-ARIA
							patterns, keyboard navigation, focus management, screen reader
							support
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-400">+</span>
						<span>
							<strong className="text-white/88">AI-First</strong> - Component
							manifests for LLM consumption via API
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-400">+</span>
						<span>
							<strong className="text-white/88">Composable</strong> - Compound
							components that compose into complex UIs
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-400">+</span>
						<span>
							<strong className="text-white/88">Tree-Shakeable</strong> - Import
							individual components to minimize bundle size
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-400">+</span>
						<span>
							<strong className="text-white/88">Optional Animations</strong> -
							Tree-shakeable GSAP integration for smooth animations
						</span>
					</li>
				</ul>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-white mb-4">Quick Start</h2>
				<CodeBlock
					code={`npm install @outpacesoftware/systems

# Optional: Add GSAP for enhanced animations
npm install gsap`}
					language="bash"
				/>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
				<CodeBlock
					code={`import { Button, Dialog, Tooltip } from '@outpacesoftware/systems';

// Compound component pattern
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 ...">
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.Description>Are you sure?</Dialog.Description>
      <Dialog.Close>Cancel</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

// Full keyboard and screen reader support built in
<Tooltip.Root>
  <Tooltip.Trigger>Hover or focus me</Tooltip.Trigger>
  <Tooltip.Content>Helpful information</Tooltip.Content>
</Tooltip.Root>`}
					language="tsx"
				/>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
					Individual Imports
				</h2>
				<p className="text-[13px] leading-5 text-white/72 mb-4 tracking-[0.12px]">
					Import only what you need for optimal bundle size:
				</p>
				<CodeBlock
					code={`// Import specific primitives
import { Dialog } from '@outpacesoftware/systems/primitives/Dialog';
import { Tooltip } from '@outpacesoftware/systems/primitives/Tooltip';
import { Menu } from '@outpacesoftware/systems/primitives/Menu';

// Import accessibility utilities
import { useReducedMotion, useFocusTrap } from '@outpacesoftware/systems/accessibility';

// Import animation hooks (requires gsap)
import { useDialogAnimation } from '@outpacesoftware/systems/animation';`}
					language="tsx"
				/>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
					Accessibility Utilities
				</h2>
				<p className="text-[13px] leading-5 text-white/72 mb-4 tracking-[0.12px]">
					Built-in utilities to enhance accessibility in your application:
				</p>
				<CodeBlock
					code={`import {
  useReducedMotion,
  useFocusTrap,
  useAriaLiveAnnouncer,
  VisuallyHidden
} from '@outpacesoftware/systems';

// Respect user motion preferences
const prefersReducedMotion = useReducedMotion();

// Trap focus in modals
useFocusTrap(containerRef, { enabled: isOpen });

// Announce updates to screen readers
const { announce } = useAriaLiveAnnouncer();
announce('Form submitted successfully');

// Hide content visually but keep accessible
<VisuallyHidden>Close dialog</VisuallyHidden>`}
					language="tsx"
				/>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
					Animation Hooks
				</h2>
				<p className="text-[13px] leading-5 text-white/72 mb-4 tracking-[0.12px]">
					Optional GSAP-powered animations with automatic reduced motion
					support:
				</p>
				<CodeBlock
					code={`import {
  AnimationProvider,
  useDialogAnimation,
  useAccordionAnimation,
  useToastAnimation
} from '@outpacesoftware/systems';

// Wrap your app for global animation config
<AnimationProvider config={{ durationMultiplier: 1 }}>
  <App />
</AnimationProvider>

// Smooth dialog animations
const { contentRef, animateIn, animateOut } = useDialogAnimation();

// Height transitions for accordions
const { contentRef, wrapperRef } = useAccordionAnimation({ isOpen });

// Position-aware toast animations
const { ref, animateIn } = useToastAnimation({ position: 'top-right' });`}
					language="tsx"
				/>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-white/88 mb-4">
					For AI/LLMs
				</h2>
				<p className="text-[13px] leading-5 text-white/72 mb-4 tracking-[0.12px]">
					Query our API to discover and use components programmatically:
				</p>
				<CodeBlock
					code={`# Query by semantic description
GET /api/design-system/query?semantic=show+status

# Get component details
GET /api/design-system/query?name=Button&format=llm

# Full manifest with all components
GET /api/design-system/manifest`}
					language="bash"
				/>
			</section>
		</div>
	);
}
