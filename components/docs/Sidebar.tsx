'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'For LLMs', href: '/docs/for-llms' },
    ],
  },
  {
    title: 'Foundation',
    items: [
      { title: 'Design Tokens', href: '/docs/tokens' },
    ],
  },
  {
    title: 'Action',
    items: [
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Toggle', href: '/docs/components/toggle' },
      { title: 'Toggle Group', href: '/docs/components/togglegroup' },
      { title: 'Toolbar', href: '/docs/components/toolbar' },
    ],
  },
  {
    title: 'Form',
    items: [
      { title: 'Input', href: '/docs/components/input' },
      { title: 'Checkbox', href: '/docs/components/checkbox' },
      { title: 'Checkbox Group', href: '/docs/components/checkboxgroup' },
      { title: 'Switch', href: '/docs/components/switch' },
      { title: 'Select', href: '/docs/components/select' },
      { title: 'Radio', href: '/docs/components/radio' },
      { title: 'Radio Group', href: '/docs/components/radiogroup' },
      { title: 'Slider', href: '/docs/components/slider' },
      { title: 'Number Field', href: '/docs/components/numberfield' },
      { title: 'Combobox', href: '/docs/components/combobox' },
      { title: 'Field', href: '/docs/components/field' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { title: 'Tabs', href: '/docs/components/tabs' },
      { title: 'Menu', href: '/docs/components/menu' },
      { title: 'Context Menu', href: '/docs/components/contextmenu' },
      { title: 'Navigation Menu', href: '/docs/components/navigationmenu' },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { title: 'Dialog', href: '/docs/components/dialog' },
      { title: 'Alert Dialog', href: '/docs/components/alertdialog' },
      { title: 'Tooltip', href: '/docs/components/tooltip' },
      { title: 'Popover', href: '/docs/components/popover' },
      { title: 'Preview Card', href: '/docs/components/previewcard' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { title: 'Progress', href: '/docs/components/progress' },
      { title: 'Toast', href: '/docs/components/toast' },
      { title: 'Meter', href: '/docs/components/meter' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { title: 'Accordion', href: '/docs/components/accordion' },
      { title: 'Collapsible', href: '/docs/components/collapsible' },
      { title: 'Separator', href: '/docs/components/separator' },
      { title: 'Scroll Area', href: '/docs/components/scrollarea' },
    ],
  },
  {
    title: 'Display',
    items: [
      { title: 'Avatar', href: '/docs/components/avatar' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-white/8 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="text-[10px] leading-[13px] font-semibold text-white/48 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-1.5 rounded-md text-[13px] leading-4 tracking-[0.12px] transition-colors ${
                        isActive
                          ? 'bg-white/8 text-white/88'
                          : 'text-white/72 hover:text-white/88 hover:bg-white/4'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
