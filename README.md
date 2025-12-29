# @outpacesoftware/systems

An AI-first design system with accessible, LLM-optimized components for React.

## Features

- **Accessible** - WAI-ARIA patterns, keyboard navigation, focus management, screen reader support
- **AI-First** - Component manifests for LLM consumption via API
- **Composable** - Compound components that compose into complex UIs
- **Tree-Shakeable** - Import individual components to minimize bundle size
- **Optional Animations** - Tree-shakeable GSAP integration for smooth animations

## Installation

```bash
npm install @outpacesoftware/systems
# or
pnpm add @outpacesoftware/systems
```

### Optional: GSAP Animations

```bash
npm install gsap
```

## Quick Start

```tsx
import { Button, Dialog, Tooltip } from '@outpacesoftware/systems';

function App() {
  return (
    <>
      <Button variant="primary">Save Changes</Button>

      <Dialog.Root>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.Title>Confirm</Dialog.Title>
            <Dialog.Description>Are you sure?</Dialog.Description>
            <Dialog.Close>Cancel</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Content>Helpful tip</Tooltip.Content>
      </Tooltip.Root>
    </>
  );
}
```

## Individual Component Imports

Import only what you need for optimal bundle size:

```tsx
// Import specific primitives
import { Dialog } from '@outpacesoftware/systems/primitives/Dialog';
import { Tooltip } from '@outpacesoftware/systems/primitives/Tooltip';
import { Menu } from '@outpacesoftware/systems/primitives/Menu';

// Import accessibility utilities
import { useReducedMotion, useFocusTrap } from '@outpacesoftware/systems/accessibility';

// Import animation hooks (requires gsap)
import { useDialogAnimation, AnimationProvider } from '@outpacesoftware/systems/animation';
```

## Documentation

Visit the [documentation site](https://systems.outpacesoftware.com) for full component docs, examples, and API reference.

## Components

### Primitives (32 components)

Compound components with full accessibility built in:

| Category | Components |
|----------|------------|
| Overlay | Dialog, AlertDialog, Popover, Tooltip, Menu, ContextMenu, Toast |
| Form | Checkbox, CheckboxGroup, Radio, RadioGroup, Select, Combobox, Switch, Slider, Field, Input, NumberField |
| Navigation | Tabs, NavigationMenu, Accordion, Collapsible |
| Display | Avatar, Progress, Meter, Separator, ScrollArea |
| Action | Button, Toggle, ToggleGroup, Toolbar |

### Accessibility Utilities

```tsx
import {
  useReducedMotion,
  useFocusTrap,
  useAriaLiveAnnouncer,
  VisuallyHidden
} from '@outpacesoftware/systems';
```

### Animation Hooks

```tsx
import {
  AnimationProvider,
  useDialogAnimation,
  useAccordionAnimation,
  useToastAnimation,
  useElementAnimation
} from '@outpacesoftware/systems';
```

## For AI/LLMs

This design system is optimized for AI consumption. Each component includes a manifest with semantic descriptions, usage guidelines, and code examples.

Query the API:
```
GET /api/design-system/manifest
GET /api/design-system/query?name=Button
GET /api/design-system/query?semantic=show+status
```

## Development

```bash
# Install dependencies
pnpm install

# Run docs site
pnpm dev

# Build the package
pnpm --filter @outpacesoftware/systems build

# Run tests
pnpm --filter @outpacesoftware/systems test
```

## Repository Structure

```
/
├── app/                    # Next.js docs site
├── components/docs/        # Documentation components
├── lib/                    # Registry & API
├── packages/systems/       # npm package source
│   └── src/
│       ├── primitives/     # Component primitives
│       ├── animation/      # GSAP animation hooks
│       ├── utils/          # Accessibility utilities
│       └── types/          # TypeScript types
└── public/                 # Static assets
```

## License

MIT
