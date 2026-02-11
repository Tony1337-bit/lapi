import { NavItem, DocSection } from "./types";

const INLINE_CODE ="bg-glass-300 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-sm border border-glass-border";

export const DOCS_DATA: Record<string, DocSection> = {
  intro: {
    id: "intro",
    title: "Introduction to LAPI",
    blocks: [
      {
        type: "text",
        content:
          "A lightweight helper library built on top of the GameSense UI, client, and entity APIs. lapi focuses on:",
      },
      {
        type: "list",
        items: [
          "Cleaner UI creation",
          "Object‑oriented access to UI elements",
          "Easy config save/load/export/import",
          "Small utility helpers (velocity, printing, clantag, events)",
        ],
      },
    ],
  },
  installation: {
    id: "installation",
    title: "Installation",
    blocks: [
      {
        type: "text",
        content: `Place <span class="${INLINE_CODE}">lapi.lua</span> in your gamesense directory and require it in your script:`,
      },
      {
        type: "code",
        content: 'require("gamesense/lapi")',
      },
      {
        type: "text",
        content: `This will load <span class="${INLINE_CODE}">lapi</span> and expose several global helpers:`,
      },
      {
        type: "list",
        items: [
          `<span class="${INLINE_CODE}">lui</span> – UI wrapper (extends <span class="${INLINE_CODE}">ui</span>)`,
          `<span class="${INLINE_CODE}">utils</span> – utility helper functions`,
          `<span class="${INLINE_CODE}">events</span> – event wrapper for <span class="${INLINE_CODE}">client</span> callbacks`,
        ],
      },
      {
        type: "text",
        content:
          'Together, these form the <strong class="text-white font-semibold">Libre Application Programming Interface</strong>.',
      },
    ],
  },
  "ui-basics": {
    id: "ui-basics",
    title: "Ui Elements",
    description: "Each UI element returns an object with helper methods.",
    blocks: [
      // [groups]
      {
        type: "header",
        header: ["Groups"],
      },
      {
        type: "text",
        content: `Groups are used to organize UI elements by tab and container.`,
      },
      {
        type: "code",
        content: "local group = lui.group(tab: string, container: string)",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["tab", `<code class="${INLINE_CODE}">string</code>`, "Tab name"],
            [
              "container",
              `<code class="${INLINE_CODE}">string</code>`,
              "Container name",
            ],
          ],
        },
      },
      {
        type: "text",
        content: `All elements created inside a group are automatically registered for config saving.`,
      },
      // [groups]
      {
        type: "header",
        header: ["Switch (Checkbox)"],
      },
      {
        type: "code",
        content: "group:switch(name: string[, init: boolean]):",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
            [
              "init",
              `<code class="${INLINE_CODE}">boolean</code>`,
              "Default value",
            ],
          ],
        },
      },
      {
        type: "header",
        header: ["Combo"],
      },
      {
        type: "code",
        content: "group:combo(name: string, items: any[, ...])",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
            [
              "init",
              `<code class="${INLINE_CODE}">any</code>`,
              `One or more comma separated values that will be added to the combo. Alternatively, a table of strings that will be added`,
            ],
          ],
        },
      },
      {
        type: "header",
        header: ["Slider"],
      },
      {
        type: "code",
        content:
          "group:slider(name: string, min: number, max: number[, init: number])",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
            [
              "min",
              `<code class="${INLINE_CODE}">number</code>`,
              "Minimum value",
            ],
            [
              "max",
              `<code class="${INLINE_CODE}">number</code>`,
              "Maximum value",
            ],
            [
              "init",
              `<code class="${INLINE_CODE}">number</code>`,
              "Default value",
            ],
          ],
        },
      },
      {
        type: "header",
        header: ["Selectable (Multiselect)"],
      },
      {
        type: "code",
        content: "group:selectable(name: string, items: any [, ...])",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
            [
              "items",
              `<code class="${INLINE_CODE}">any</code>`,
              "One or more comma separated values that will be added to the selectable. Alternatively, a table of strings that will be added",
            ],
          ],
        },
      },
      {
        type: "header",
        header: ["List"],
      },
      {
        type: "code",
        content: "group:list(name: string, items: any [, ...])",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
            [
              "items",
              `<code class="${INLINE_CODE}">any</code>`,
              "One or more comma separated values that will be added to the list. Alternatively, a table of strings that will be added",
            ],
          ],
        },
      },
      {
        type: "header",
        header: ["Color Picker"],
      },
      {
        type: "code",
        content: "group:color_picker(name: string[, color: color])",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
            [
              "color",
              `<code class="${INLINE_CODE}">color</code>`,
              "Optional. Initial color value",
            ],
          ],
        },
      },
      {
        type: "header",
        header: ["Label"],
      },
      {
        type: "code",
        content: "group:label(name: string)",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            [
              "name",
              `<code class="${INLINE_CODE}">string</code>`,
              "Label name",
            ],
          ],
        },
      },
      {
        type: "header",
        header: ["Button"],
      },
      {
        type: "code",
        content: "group:button(name: string, callback: function)",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
            [
              "callback",
              `<code class="${INLINE_CODE}">function</code>`,
              "Callback function to be executed when the button is pressed",
            ],
          ],
        },
      },
      {
        type: "header",
        header: ["Input"],
      },
      {
        type: "code",
        content: "group:input(name: string)",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
          ],
        },
      },
      {
        type: "header",
        header: ["Hotkey"],
      },
      {
        type: "code",
        content: "group:hotkey(name: string)",
      },
      {
        type: "table",
        items: {
          header: ["Name", "Type", "Description"],
          rows: [
            ["name", `<code class="${INLINE_CODE}">string</code>`, "Item name"],
          ],
        },
      },
    ],
  },
  "ui-objects": {
    id: "ui-objects",
    title: "UI Object Methods",
    description: "Every UI element supports the following methods:",
    blocks: [
      {
        type: "text",
        content: `All UI objects support the following methods:`,
      },
      {
        type: "code",
        content: ``,
      },
    ],
  },
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    children: [
      { id: "intro", label: "Introduction" },
      { id: "installation", label: "Installation" },
    ],
  },
  {
    id: "modules",
    label: "Modules",
    children: [
      { id: "ui-basics", label: "UI Elements" },
      { id: "ui-objects", label: "UI Object Methods" },
      // { id: "render-primitives", label: "Render" },
      // { id: "entity-mgmt", label: "Entity" },
      // { id: "rage-logic", label: "Ragebot" },
    ],
  },
  // {
  //   id: "resources",
  //   label: "Resources",
  //   children: [
  //     { id: "changelog", label: "Changelog" },
  //     { id: "community", label: "Community" },
  //   ],
  // },
];
