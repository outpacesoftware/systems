'use client';

import { useState } from 'react';

// Color tokens
const colors = {
  base: [
    { name: 'white', value: '#ffffff', class: 'bg-white' },
    { name: 'black', value: '#000000', class: 'bg-black' },
  ],
  semantic: [
    { name: 'green-500', value: '#22c55e', class: 'bg-green-500', label: 'Success' },
    { name: 'red-500', value: '#ef4444', class: 'bg-red-500', label: 'Error' },
    { name: 'amber-500', value: '#f59e0b', class: 'bg-amber-500', label: 'Warning' },
    { name: 'blue-500', value: '#3b82f6', class: 'bg-blue-500', label: 'Info' },
    { name: 'purple-500', value: '#a855f7', class: 'bg-purple-500', label: 'Accent' },
  ],
};

// Opacity scale
const opacityScale = [1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 100];

// Typography sizes (Tailwind scale)
const typeSizes = [
  { name: 'text-xs', size: '0.75rem', lineHeight: '1rem', pixels: '12px' },
  { name: 'text-sm', size: '0.875rem', lineHeight: '1.25rem', pixels: '14px' },
  { name: 'text-base', size: '1rem', lineHeight: '1.5rem', pixels: '16px' },
  { name: 'text-lg', size: '1.125rem', lineHeight: '1.75rem', pixels: '18px' },
  { name: 'text-xl', size: '1.25rem', lineHeight: '1.75rem', pixels: '20px' },
  { name: 'text-2xl', size: '1.5rem', lineHeight: '2rem', pixels: '24px' },
  { name: 'text-3xl', size: '1.875rem', lineHeight: '2.25rem', pixels: '30px' },
  { name: 'text-4xl', size: '2.25rem', lineHeight: '2.5rem', pixels: '36px' },
  { name: 'text-5xl', size: '3rem', lineHeight: '1', pixels: '48px' },
  { name: 'text-6xl', size: '3.75rem', lineHeight: '1', pixels: '60px' },
  { name: 'text-7xl', size: '4.5rem', lineHeight: '1', pixels: '72px' },
  { name: 'text-8xl', size: '6rem', lineHeight: '1', pixels: '96px' },
  { name: 'text-9xl', size: '8rem', lineHeight: '1', pixels: '128px' },
];

// Font weights
const fontWeights = [
  { name: 'font-thin', value: '100' },
  { name: 'font-extralight', value: '200' },
  { name: 'font-light', value: '300' },
  { name: 'font-normal', value: '400' },
  { name: 'font-medium', value: '500' },
  { name: 'font-semibold', value: '600' },
  { name: 'font-bold', value: '700' },
  { name: 'font-extrabold', value: '800' },
  { name: 'font-black', value: '900' },
];

function ColorSwatch({ name, value, className, label }: { name: string; value: string; className: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isDark = name.includes('900') || name.includes('950') || name === 'black';
  const isLight = name.includes('50') || name.includes('100') || name.includes('200') || name === 'white';

  return (
    <button
      onClick={copy}
      className="group text-left"
    >
      <div
        className={`${className} w-full h-16 rounded-lg border border-white/8 flex items-end p-2 transition-transform group-hover:scale-105`}
      >
        <span className={`text-[10px] leading-[13px] tracking-[0.12px] ${isLight ? 'text-black/48' : 'text-white/48'}`}>
          {copied ? 'Copied!' : value}
        </span>
      </div>
      <div className="mt-2">
        <p className="text-[13px] leading-4 text-white/88 tracking-[0.12px]">{name}</p>
        {label && <p className="text-[10px] leading-[13px] text-white/48 tracking-[0.12px]">{label}</p>}
      </div>
    </button>
  );
}

export default function TokensPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-white/88 mb-4">Design Tokens</h1>
      <p className="text-[15px] leading-5 text-white/72 mb-12 tracking-[0.12px]">
        Colors and typography scales using Tailwind CSS utilities.
      </p>

      {/* Colors */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-white/88 mb-6">Colors</h2>

        {/* Base */}
        <div className="mb-8">
          <h3 className="text-[10px] leading-[13px] font-medium text-white/48 uppercase tracking-wider mb-4">Base</h3>
          <div className="grid grid-cols-2 gap-4">
            {colors.base.map((color) => (
              <ColorSwatch key={color.name} name={color.name} value={color.value} className={color.class} />
            ))}
          </div>
        </div>

        {/* Opacity Scale */}
        <div className="mb-8">
          <h3 className="text-[10px] leading-[13px] font-medium text-white/48 uppercase tracking-wider mb-4">Opacity Scale</h3>
          <div className="flex flex-wrap gap-2">
            {opacityScale.map((opacity) => (
              <div key={opacity} className="text-center">
                <div
                  className="w-12 h-12 rounded-lg border border-white/8"
                  style={{ backgroundColor: `rgba(255,255,255,${opacity / 100})` }}
                />
                <span className="text-[10px] leading-[13px] text-white/48 mt-1 block tracking-[0.12px]">{opacity}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] leading-4 text-white/48 mt-4 tracking-[0.12px]">
            Use with Tailwind: <code className="text-green-400">white/8</code>, <code className="text-green-400">black/16</code>, etc.
          </p>
        </div>

        {/* Semantic */}
        <div>
          <h3 className="text-[10px] leading-[13px] font-medium text-white/48 uppercase tracking-wider mb-4">Semantic</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.semantic.map((color) => (
              <ColorSwatch key={color.name} name={color.name} value={color.value} className={color.class} label={color.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-white/88 mb-6">Typography</h2>

        {/* Sizes */}
        <div className="mb-12">
          <h3 className="text-[10px] leading-[13px] font-medium text-white/48 uppercase tracking-wider mb-4">Sizes</h3>
          <div className="space-y-4">
            {typeSizes.map((type) => (
              <div key={type.name} className="flex items-baseline gap-4 py-2 border-b border-white/4">
                <code className="text-[13px] leading-4 text-green-400 w-24 shrink-0 tracking-[0.12px]">{type.name}</code>
                <span className="text-white/48 text-[13px] leading-4 w-20 shrink-0 tracking-[0.12px]">{type.pixels}</span>
                <span className={type.name.replace('text-', 'text-')} style={{ fontSize: type.size, lineHeight: type.lineHeight }}>
                  The quick brown fox
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weights */}
        <div className="mb-12">
          <h3 className="text-[10px] leading-[13px] font-medium text-white/48 uppercase tracking-wider mb-4">Weights</h3>
          <div className="space-y-3">
            {fontWeights.map((weight) => (
              <div key={weight.name} className="flex items-center gap-4 py-2 border-b border-white/4">
                <code className="text-[13px] leading-4 text-green-400 w-32 shrink-0 tracking-[0.12px]">{weight.name}</code>
                <span className="text-white/48 text-[13px] leading-4 w-12 shrink-0 tracking-[0.12px]">{weight.value}</span>
                <span className="text-xl" style={{ fontWeight: weight.value }}>
                  The quick brown fox jumps over the lazy dog
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div>
          <h3 className="text-[10px] leading-[13px] font-medium text-white/48 uppercase tracking-wider mb-4">Usage</h3>
          <div className="bg-white/4 border border-white/8 rounded-lg p-4 overflow-x-auto">
            <pre className="text-[13px] leading-4 text-white/88 tracking-[0.12px]">
{`{/* Size classes */}
<p className="text-xs">Extra small text</p>
<p className="text-sm">Small text</p>
<p className="text-base">Base text</p>
<p className="text-lg">Large text</p>
<h1 className="text-4xl">Heading</h1>

{/* Weight classes */}
<p className="font-normal">Regular weight</p>
<p className="font-medium">Medium weight</p>
<p className="font-semibold">Semibold weight</p>
<p className="font-bold">Bold weight</p>

{/* Combined */}
<h1 className="text-4xl font-bold">Page Title</h1>
<p className="text-lg text-white/70">Subtitle text</p>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-2xl font-semibold text-white/88 mb-6">Spacing</h2>
        <p className="text-[13px] leading-4 text-white/72 mb-4 tracking-[0.12px]">
          Use Tailwind&apos;s spacing scale for consistent spacing:
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32].map((n) => (
            <div key={n} className="text-center">
              <div
                className="bg-purple-500/48 rounded"
                style={{ width: `${n * 4}px`, height: '24px', minWidth: '2px' }}
              />
              <span className="text-[10px] leading-[13px] text-white/48 mt-1 block tracking-[0.12px]">{n}</span>
            </div>
          ))}
        </div>
        <div className="bg-white/4 border border-white/8 rounded-lg p-4">
          <pre className="text-[13px] leading-4 text-white/88 tracking-[0.12px]">
{`{/* Padding */}
<div className="p-4">16px padding</div>
<div className="px-6 py-3">24px horizontal, 12px vertical</div>

{/* Margin */}
<div className="mt-8">32px top margin</div>
<div className="mb-4">16px bottom margin</div>

{/* Gap */}
<div className="flex gap-4">16px gap between items</div>`}
          </pre>
        </div>
      </section>
    </div>
  );
}
