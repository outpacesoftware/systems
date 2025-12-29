"use client";

export default function AnimationPage() {
	return (
		<div className="max-w-4xl">
			<h1 className="text-4xl font-bold text-white/88 mb-4">Animation</h1>
			<p className="text-[15px] leading-6 text-white/72 mb-12 tracking-[0.12px]">
				@outpacesoftware/systems includes an optional GSAP-powered animation
				system. Components work with CSS transitions by default, but can be
				enhanced with smooth GSAP animations when the library is installed.
			</p>

			{/* Installation */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Installation
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					GSAP is an optional peer dependency. Install it to enable enhanced
					animations:
				</p>

				<div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto mb-6">
					<pre className="text-[13px] leading-5 text-white/88 tracking-[0.12px]">
						{`npm install gsap
# or
pnpm add gsap
# or
yarn add gsap`}
					</pre>
				</div>

				<div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
					<p className="text-[13px] leading-5 text-amber-200 tracking-[0.12px]">
						<strong>Note:</strong> Components work without GSAP using CSS
						transitions. GSAP provides smoother, more controllable animations
						but is entirely optional.
					</p>
				</div>
			</section>

			{/* Setup */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">Setup</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					Wrap your application with AnimationProvider to enable GSAP animations
					and configure global animation settings.
				</p>

				<div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto">
					<pre className="text-[13px] leading-5 text-white/88 tracking-[0.12px]">
						{`import { AnimationProvider } from '@outpacesoftware/systems';

function App() {
  return (
    <AnimationProvider
      config={{
        // Global duration multiplier (default: 1)
        durationMultiplier: 1,
        // Global easing (default: 'power2.out')
        defaultEase: 'power2.out',
        // Respect prefers-reduced-motion (default: true)
        respectReducedMotion: true,
      }}
    >
      {/* Your app content */}
    </AnimationProvider>
  );
}`}
					</pre>
				</div>
			</section>

			{/* Animation Hooks */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Animation Hooks
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					Use these hooks to add GSAP animations to your components.
				</p>

				{/* useElementAnimation */}
				<div className="mb-8">
					<h3 className="text-lg font-medium text-white/88 mb-3">
						useElementAnimation
					</h3>
					<p className="text-[13px] leading-5 text-white/64 mb-4 tracking-[0.12px]">
						Base hook for animating any element. Provides low-level control over
						GSAP animations.
					</p>
					<div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto">
						<pre className="text-[13px] leading-5 text-white/88 tracking-[0.12px]">
							{`import { useElementAnimation } from '@outpacesoftware/systems';

function AnimatedBox() {
  const { ref, animate, isAnimating } = useElementAnimation();

  const handleEnter = () => {
    animate({
      opacity: 1,
      y: 0,
      duration: 0.3,
    });
  };

  const handleExit = () => {
    animate({
      opacity: 0,
      y: -20,
      duration: 0.2,
    });
  };

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(20px)' }}>
      <button onClick={handleEnter}>Enter</button>
      <button onClick={handleExit}>Exit</button>
    </div>
  );
}`}
						</pre>
					</div>
				</div>

				{/* useDialogAnimation */}
				<div className="mb-8">
					<h3 className="text-lg font-medium text-white/88 mb-3">
						useDialogAnimation
					</h3>
					<p className="text-[13px] leading-5 text-white/64 mb-4 tracking-[0.12px]">
						Specialized hook for dialog/modal animations with backdrop support.
					</p>
					<div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto">
						<pre className="text-[13px] leading-5 text-white/88 tracking-[0.12px]">
							{`import { useDialogAnimation } from '@outpacesoftware/systems';

function AnimatedDialog({ isOpen, onClose, children }) {
  const {
    contentRef,
    backdropRef,
    animateIn,
    animateOut,
    isAnimating,
  } = useDialogAnimation({
    enterDuration: 0.3,
    exitDuration: 0.2,
    enterEase: 'power2.out',
    exitEase: 'power2.in',
  });

  useEffect(() => {
    if (isOpen) {
      animateIn();
    }
  }, [isOpen, animateIn]);

  const handleClose = async () => {
    await animateOut();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={backdropRef} className="backdrop">
      <div ref={contentRef} className="dialog-content">
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}`}
						</pre>
					</div>
				</div>

				{/* useAccordionAnimation */}
				<div className="mb-8">
					<h3 className="text-lg font-medium text-white/88 mb-3">
						useAccordionAnimation
					</h3>
					<p className="text-[13px] leading-5 text-white/64 mb-4 tracking-[0.12px]">
						Smooth height animations for accordion/collapsible content.
					</p>
					<div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto">
						<pre className="text-[13px] leading-5 text-white/88 tracking-[0.12px]">
							{`import { useAccordionAnimation } from '@outpacesoftware/systems';

function AnimatedAccordion({ isOpen, children }) {
  const { contentRef, wrapperRef, isAnimating } = useAccordionAnimation({
    isOpen,
    duration: 0.3,
    ease: 'power2.inOut',
  });

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}`}
						</pre>
					</div>
				</div>

				{/* useToastAnimation */}
				<div className="mb-8">
					<h3 className="text-lg font-medium text-white/88 mb-3">
						useToastAnimation
					</h3>
					<p className="text-[13px] leading-5 text-white/64 mb-4 tracking-[0.12px]">
						Position-aware slide animations for toast notifications.
					</p>
					<div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto">
						<pre className="text-[13px] leading-5 text-white/88 tracking-[0.12px]">
							{`import { useToastAnimation } from '@outpacesoftware/systems';

function AnimatedToast({ position, onDismiss, children }) {
  const { ref, animateIn, animateOut, isAnimating } = useToastAnimation({
    position, // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
    enterDuration: 0.3,
    exitDuration: 0.2,
  });

  useEffect(() => {
    animateIn();
  }, [animateIn]);

  const handleDismiss = async () => {
    await animateOut();
    onDismiss();
  };

  return (
    <div ref={ref}>
      {children}
      <button onClick={handleDismiss}>Dismiss</button>
    </div>
  );
}`}
						</pre>
					</div>
				</div>
			</section>

			{/* GSAP Loader */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					GSAP Loader
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					For advanced use cases, you can access GSAP directly through the
					loader utilities.
				</p>

				<div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto">
					<pre className="text-[13px] leading-5 text-white/88 tracking-[0.12px]">
						{`import {
  loadGSAP,
  getGSAP,
  isGSAPAvailable,
} from '@outpacesoftware/systems';

// Check if GSAP is available
if (isGSAPAvailable()) {
  const gsap = getGSAP();
  gsap.to('.element', { opacity: 1 });
}

// Or load asynchronously
async function setupAnimation() {
  const gsap = await loadGSAP();
  if (gsap) {
    gsap.to('.element', { opacity: 1 });
  }
}`}
					</pre>
				</div>
			</section>

			{/* Reduced Motion */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Reduced Motion
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					All animation hooks automatically respect the user&apos;s
					prefers-reduced-motion setting. When reduced motion is preferred,
					animations are instant or disabled.
				</p>

				<div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto mb-6">
					<pre className="text-[13px] leading-5 text-white/88 tracking-[0.12px]">
						{`import { useReducedMotion } from '@outpacesoftware/systems';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  // Animation hooks handle this automatically,
  // but you can use it for custom animations:
  const duration = prefersReducedMotion ? 0 : 0.3;

  return (
    <div style={{ transition: \`opacity \${duration}s\` }}>
      Content
    </div>
  );
}`}
					</pre>
				</div>

				<div className="space-y-4">
					<div className="bg-white/4 border border-white/8 rounded-lg p-4">
						<h3 className="text-[13px] leading-4 font-medium text-white/88 mb-2">
							Behavior by Hook
						</h3>
						<ul className="text-[13px] leading-5 text-white/64 space-y-2">
							<li>
								<code className="text-green-400">useDialogAnimation</code> -
								Instant show/hide, no scale or fade
							</li>
							<li>
								<code className="text-green-400">useAccordionAnimation</code> -
								Instant height change
							</li>
							<li>
								<code className="text-green-400">useToastAnimation</code> -
								Instant appear/disappear
							</li>
							<li>
								<code className="text-green-400">useElementAnimation</code> -
								Duration set to 0
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Configuration */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Configuration Options
				</h2>
				<p className="text-[15px] leading-6 text-white/72 mb-6 tracking-[0.12px]">
					AnimationProvider accepts a config object for global animation
					settings.
				</p>

				<div className="overflow-x-auto">
					<table className="w-full text-[13px] leading-5">
						<thead>
							<tr className="border-b border-white/8">
								<th className="text-left py-3 pr-4 text-white/88 font-medium">
									Option
								</th>
								<th className="text-left py-3 pr-4 text-white/88 font-medium">
									Type
								</th>
								<th className="text-left py-3 pr-4 text-white/88 font-medium">
									Default
								</th>
								<th className="text-left py-3 text-white/88 font-medium">
									Description
								</th>
							</tr>
						</thead>
						<tbody className="text-white/64">
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">
									<code className="text-green-400">durationMultiplier</code>
								</td>
								<td className="py-3 pr-4">number</td>
								<td className="py-3 pr-4">1</td>
								<td className="py-3">Scale all animation durations</td>
							</tr>
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">
									<code className="text-green-400">defaultEase</code>
								</td>
								<td className="py-3 pr-4">string</td>
								<td className="py-3 pr-4">&apos;power2.out&apos;</td>
								<td className="py-3">Default GSAP easing function</td>
							</tr>
							<tr className="border-b border-white/8">
								<td className="py-3 pr-4">
									<code className="text-green-400">respectReducedMotion</code>
								</td>
								<td className="py-3 pr-4">boolean</td>
								<td className="py-3 pr-4">true</td>
								<td className="py-3">Honor prefers-reduced-motion</td>
							</tr>
							<tr>
								<td className="py-3 pr-4">
									<code className="text-green-400">disabled</code>
								</td>
								<td className="py-3 pr-4">boolean</td>
								<td className="py-3 pr-4">false</td>
								<td className="py-3">Disable all GSAP animations</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* Best Practices */}
			<section>
				<h2 className="text-2xl font-semibold text-white/88 mb-6">
					Best Practices
				</h2>
				<ul className="space-y-3 text-[13px] leading-5 text-white/64">
					<li className="flex gap-3">
						<span className="text-green-400">1.</span>
						<span>
							<strong className="text-white/88">Keep animations short</strong> -
							200-400ms is ideal for UI interactions
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-green-400">2.</span>
						<span>
							<strong className="text-white/88">Use appropriate easing</strong>{" "}
							- power2.out for entrances, power2.in for exits
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-green-400">3.</span>
						<span>
							<strong className="text-white/88">
								Always handle reduced motion
							</strong>{" "}
							- Animation hooks do this automatically
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-green-400">4.</span>
						<span>
							<strong className="text-white/88">Avoid layout thrashing</strong>{" "}
							- Animate transform and opacity, not width/height when possible
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-green-400">5.</span>
						<span>
							<strong className="text-white/88">Test without GSAP</strong> -
							Ensure your components work with CSS fallbacks
						</span>
					</li>
				</ul>
			</section>
		</div>
	);
}
