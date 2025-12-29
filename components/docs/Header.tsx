import Link from 'next/link';

export function Header() {
  return (
    <header className="h-16 border-b border-white/8 sticky top-0 bg-black/80 backdrop-blur-md z-50">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[15px] leading-5 font-semibold text-white/88 tracking-[0.12px]">
            @outpace/systems
          </span>
          <span className="text-[10px] leading-[13px] px-1.5 py-0.5 rounded bg-white/8 text-white/72 tracking-[0.12px]">
            v0.0.1
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-[13px] leading-4 text-white/72 hover:text-white/88 transition-colors tracking-[0.12px]"
          >
            Docs
          </Link>
          <Link
            href="/docs/components/button"
            className="text-[13px] leading-4 text-white/72 hover:text-white/88 transition-colors tracking-[0.12px]"
          >
            Components
          </Link>
          <a
            href="https://github.com/outpacestudios/systems"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] leading-4 text-white/72 hover:text-white/88 transition-colors tracking-[0.12px]"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
