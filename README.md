# Systems

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

## Quick Start

```tsx
import { Button, Input, Badge } from '@outpacesoftware/systems';

function App() {
  return (
    <>
      <Button variant="primary">Save Changes</Button>
      <Input label="Email" placeholder="you@example.com" />
      <Badge variant="success">Active</Badge>
    </>
  );
}
```

## Documentation

Visit the [documentation site](https://systems.outpacesoftware.com) for full component docs, examples, and API reference.

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

32 headless primitives including Dialog, Menu, Tabs, Tooltip, Popover, Toast, and more. Import from `@outpacesoftware/systems/primitives/*`.

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
```

## Repository Structure

```
/
├── app/                    # Next.js docs site
├── components/docs/        # Documentation components
├── lib/                    # Registry & MCP server
├── packages/systems/       # npm package source
└── public/                 # Static assets
```

## License

MIT
