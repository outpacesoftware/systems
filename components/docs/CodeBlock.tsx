'use client';

import { useState, useCallback } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className="relative group rounded-lg overflow-hidden bg-white/4 border border-white/8">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/8">
        <span className="text-[10px] leading-[13px] text-white/48 tracking-[0.12px]">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-[10px] leading-[13px] text-white/48 hover:text-white/88 transition-colors tracking-[0.12px]"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-4">
        <code className="text-white/88 tracking-[0.12px]">
          {showLineNumbers
            ? lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 text-white/32 select-none">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}
