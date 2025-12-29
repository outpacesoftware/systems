# @outpacesoftware/systems

An AI-first design system with opinionated, accessible, LLM-optimized components for React.

## Features

- **Opinionated** - Beautiful dark-theme styling out of the box
- **Accessible** - WAI-ARIA patterns built in
- **AI-First** - Component manifests for LLM consumption via MCP
- **Composable** - Small building blocks that compose into complex UIs
- **Two Layers** - Styled components for quick use, primitives for customization

## Installation

```bash
npm install @outpacesoftware/systems
# or
pnpm add @outpacesoftware/systems
```

## Usage

### Styled Components (Recommended)

```tsx
import { Button, Input, Dialog, Badge } from '@outpacesoftware/systems';

// Ready to use with built-in styling
<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn more</Button>

<Input
  label="Email"
  placeholder="you@example.com"
  required
/>

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
```

### Primitives (For Custom Styling)

```tsx
import { Primitives } from '@outpacesoftware/systems';

// Unstyled primitives for full control
<Primitives.Button className="your-custom-styles">
  Click me
</Primitives.Button>

// Composition pattern for complex components
<Primitives.Dialog.Root>
  <Primitives.Dialog.Trigger>Open</Primitives.Dialog.Trigger>
  <Primitives.Dialog.Portal>
    <Primitives.Dialog.Backdrop />
    <Primitives.Dialog.Content>
      <Primitives.Dialog.Title>Title</Primitives.Dialog.Title>
      <Primitives.Dialog.Close />
    </Primitives.Dialog.Content>
  </Primitives.Dialog.Portal>
</Primitives.Dialog.Root>
```

## Components

### Styled (Opinionated)

| Component | Description |
|-----------|-------------|
| Button | Primary interaction trigger with variants |
| Input | Text input with label and error states |
| Select | Dropdown selection |
| Textarea | Multi-line text input |
| Checkbox | Boolean selection |
| Switch | Toggle on/off |
| Badge | Status indicators |
| Card | Content containers |
| Dialog | Modal dialogs |

### Primitives (Unstyled)

32 primitives including Dialog, Menu, Tabs, Tooltip, Popover, Toast, and more.

## For AI/LLMs

This design system is optimized for AI consumption. Each component includes a manifest with:

- Semantic description
- Props documentation
- Accessibility information
- Code examples

Query the API:

```bash
GET /api/design-system/query?semantic=show+status
GET /api/design-system/query?name=Button&format=llm
GET /api/design-system/manifest
```

## Requirements

- React 18+
- React DOM 18+

## License

MIT
