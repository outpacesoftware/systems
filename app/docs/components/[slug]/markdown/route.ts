import { NextResponse } from 'next/server';
import { getManifest, getComponentNames } from '@/lib/registry';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const names = getComponentNames();
  return names.map((name) => ({ slug: name.toLowerCase() }));
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const manifest = getManifest(slug);

  if (!manifest) {
    return new NextResponse('Component not found', { status: 404 });
  }

  // Generate markdown content from manifest
  const markdown = generateMarkdown(manifest);

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function generateMarkdown(manifest: ReturnType<typeof getManifest>): string {
  if (!manifest) return '';

  const lines: string[] = [];

  // Title and description
  lines.push(`# ${manifest.displayName}`);
  lines.push('');
  lines.push(manifest.description);
  lines.push('');

  // Metadata
  lines.push(`**Category:** ${manifest.category}`);
  lines.push(`**Tags:** ${manifest.tags.join(', ')}`);
  lines.push('');

  // Import
  lines.push('## Import');
  lines.push('');
  lines.push('```tsx');
  lines.push(`import { ${manifest.name} } from '${manifest.importPath}';`);
  lines.push('```');
  lines.push('');

  // When to use
  lines.push('## When to use');
  lines.push('');
  lines.push('### Use when');
  lines.push('');
  manifest.useWhen.forEach((use) => {
    lines.push(`- ${use}`);
  });
  lines.push('');
  lines.push("### Don't use when");
  lines.push('');
  manifest.dontUseWhen.forEach((dont) => {
    lines.push(`- ${dont}`);
  });
  lines.push('');

  // Props
  lines.push('## Props');
  lines.push('');
  lines.push('| Prop | Type | Default | Description |');
  lines.push('|------|------|---------|-------------|');
  Object.entries(manifest.props).forEach(([name, prop]) => {
    const type = prop.type.replace(/\|/g, '\\|');
    const defaultVal = prop.default !== undefined ? `\`${prop.default}\`` : '-';
    const required = prop.required ? ' (required)' : '';
    lines.push(`| \`${name}\` | \`${type}\`${required} | ${defaultVal} | ${prop.description} |`);
  });
  lines.push('');

  // Examples
  lines.push('## Examples');
  lines.push('');
  manifest.examples.forEach((example) => {
    lines.push(`### ${example.name}`);
    lines.push('');
    if (example.description) {
      lines.push(example.description);
      lines.push('');
    }
    lines.push('```tsx');
    lines.push(example.code);
    lines.push('```');
    lines.push('');
  });

  // Slots (for composed components)
  if (manifest.slots && Object.keys(manifest.slots).length > 0) {
    lines.push('## Slots');
    lines.push('');
    Object.entries(manifest.slots).forEach(([name, slot]) => {
      lines.push(`### ${manifest.name}.${name}`);
      lines.push('');
      lines.push(slot.description);
      lines.push('');
    });
  }

  // Accessibility
  lines.push('## Accessibility');
  lines.push('');
  if (manifest.accessibility.role) {
    lines.push(`**Role:** \`${manifest.accessibility.role}\``);
    lines.push('');
  }
  if (manifest.accessibility.keyboard && manifest.accessibility.keyboard.length > 0) {
    lines.push(`**Keyboard:** ${manifest.accessibility.keyboard.join(', ')}`);
    lines.push('');
  }
  if (manifest.accessibility.focusManagement) {
    lines.push(`**Focus management:** ${manifest.accessibility.focusManagement}`);
    lines.push('');
  }
  if (manifest.accessibility.screenReader) {
    lines.push(`**Screen reader:** ${manifest.accessibility.screenReader}`);
    lines.push('');
  }

  // Related components
  if (manifest.relatedComponents && manifest.relatedComponents.length > 0) {
    lines.push('## Related Components');
    lines.push('');
    manifest.relatedComponents.forEach((name) => {
      lines.push(`- [${name}](/docs/components/${name.toLowerCase()})`);
    });
    lines.push('');
  }

  return lines.join('\n');
}
