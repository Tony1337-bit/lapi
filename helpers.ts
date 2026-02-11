// docs/helpers.ts
const INLINE_CODE =
  "bg-glass-300 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-sm border border-glass-border";

export const ic = (text: string) =>
  `<span class="${INLINE_CODE}">${text}</span>`;

// blocks
export const t = (content: string) => ({ type: "text", content });
export const h = (...header: string[]) => ({ type: "header", header });
export const code = (content: string) => ({ type: "code", content });
export const list = (items: string[]) => ({ type: "list", items });

export const table = (
  header: string[],
  rows: string[][]
) => ({
  type: "table",
  items: { header, rows },
});

// table helpers
export const param = (
  name: string,
  type: string,
  desc: string
) => [name, ic(type), desc];

// reusable UI element doc
export const uiElement = (
  title: string,
  signature: string,
  params: ReturnType<typeof param>[]
) => [
  h(title),
  code(signature),
  table(["Name", "Type", "Description"], params),
];
