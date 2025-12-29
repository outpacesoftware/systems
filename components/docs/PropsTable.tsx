interface PropDefinition {
  type: string;
  description: string;
  default?: unknown;
  required?: boolean;
  values?: string[];
}

interface PropsTableProps {
  props: Record<string, PropDefinition>;
}

export function PropsTable({ props }: PropsTableProps) {
  const entries = Object.entries(props);

  if (entries.length === 0) {
    return <p className="text-[13px] leading-4 text-white/48 tracking-[0.12px]">No props defined.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px] leading-4 tracking-[0.12px]">
        <thead>
          <tr className="border-b border-white/8">
            <th className="text-left py-3 px-4 text-white/72 font-medium">
              Prop
            </th>
            <th className="text-left py-3 px-4 text-white/72 font-medium">
              Type
            </th>
            <th className="text-left py-3 px-4 text-white/72 font-medium">
              Default
            </th>
            <th className="text-left py-3 px-4 text-white/72 font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([name, prop]) => (
            <tr key={name} className="border-b border-white/4">
              <td className="py-3 px-4">
                <code className="text-green-400">{name}</code>
                {prop.required && (
                  <span className="ml-1 text-red-400">*</span>
                )}
              </td>
              <td className="py-3 px-4">
                <code className="text-blue-400 text-[12px] leading-[15px]">{prop.type}</code>
              </td>
              <td className="py-3 px-4 text-white/48">
                {prop.default !== undefined ? String(prop.default) : '-'}
              </td>
              <td className="py-3 px-4 text-white/72">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
