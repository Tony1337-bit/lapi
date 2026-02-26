import { NavItem, DocSection } from "./types";

// ============================================================================
// STYLING CONSTANTS
// ============================================================================
const STYLES = {
  inlineCode:
    "bg-glass-300 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-sm border border-glass-border",
  emphasis: "text-white font-semibold",
} as const;

// ============================================================================
// HELPER FUNCTIONS - Make creating content blocks easier
// ============================================================================

const code = (codeStr: string) =>
  `<code class="${STYLES.inlineCode}">${codeStr}</code>`;

const text = (content: string) => ({ type: "text" as const, content });

const codeBlock = (content: string) => ({ type: "code" as const, content });

const list = (items: string[]) => ({ type: "list" as const, items });

const header = (text: string) => ({ type: "header" as const, header: [text] });

// Add this with your other helpers:
const link = (text: string, url: string) =>
  `<a href="${url}" class="text-indigo-400 hover:text-indigo-300 underline">${text}</a>`;

const subheader = (text: string) => ({
  type: "subheader" as const,
  content: text,
});

const table = (header: string[], rows: Array<[string, string, string]>) => ({
  type: "table" as const,
  items: { header, rows },
});

// Helper to create parameter tables (common pattern)
const paramTable = (
  params: Array<{ name: string; type: string; description: string }>,
) => {
  return table(
    ["Name", "Type", "Description"],
    params.map((p) => [p.name, code(p.type), p.description]),
  );
};

// ============================================================================
// DOCUMENTATION SECTIONS
// ============================================================================

export const DOCS_DATA: Record<string, DocSection> = {
  // --------------------------------------------------------------------------
  // GETTING STARTED
  // --------------------------------------------------------------------------
  intro: {
    id: "intro",
    title: "Introduction to LAPI",
    blocks: [
      text(
        "A lightweight helper library built on top of the GameSense UI, client, and entity APIs. lapi focuses on:",
      ),
      list([
        "Cleaner UI creation",
        "Object‑oriented access to UI elements",
        "Easy config save/load/export/import",
        "Small utility helpers (velocity, printing, clantag, events)",
      ]),
    ],
  },

  installation: {
    id: "installation",
    title: "Installation",
    blocks: [
      text(
        `Place ${code("lapi.lua")} in your gamesense directory and require it in your script:`,
      ),
      codeBlock('require("gamesense/lapi")'),
      text(`This will load ${code("lapi")} and expose several global helpers:`),
      list([
        `${code("lui")} – UI wrapper (extends ${code("ui")})`,
        `${code("utils")} – utility helper functions`,
        `${code("events")} – event wrapper for ${code("client")} callbacks`,
      ]),
      text(
        `Together, these form the <strong class="${STYLES.emphasis}">Libre Application Programming Interface</strong>.`,
      ),
    ],
  },

  // --------------------------------------------------------------------------
  // UI ELEMENTS
  // --------------------------------------------------------------------------
  "ui-basics": {
    id: "ui-basics",
    title: "UI Elements",
    description: "Each UI element returns an object with helper methods.",
    blocks: [
      // Groups
      header("Groups"),
      text("Groups are used to organize UI elements by tab and container."),
      codeBlock("local group = lui.group(tab: string, container: string)"),
      paramTable([
        { name: "tab", type: "string", description: "Tab name" },
        { name: "container", type: "string", description: "Container name" },
      ]),
      text(
        "All elements created inside a group are automatically registered for config saving.",
      ),

      // Switch
      header("Switch (Checkbox)"),
      codeBlock("group:switch(name: string[, init: boolean])"),
      paramTable([
        { name: "name", type: "string", description: "Item name" },
        { name: "init", type: "boolean", description: "Default value" },
      ]),

      // Combo
      header("Combo"),
      codeBlock("group:combo(name: string, items: any[, ...])"),
      paramTable([
        { name: "name", type: "string", description: "Item name" },
        {
          name: "init",
          type: "any",
          description:
            "One or more comma separated values that will be added to the combo. Alternatively, a table of strings that will be added",
        },
      ]),

      // Slider
      header("Slider"),
      codeBlock(
        "group:slider(name: string, min: number, max: number[, init: number, show_tooltip: boolean, unit: string, scale: number, tooltip: string])",
      ),
      paramTable([
        { name: "name", type: "string", description: "Item name" },
        { name: "min", type: "number", description: "Minimum value" },
        { name: "max", type: "number", description: "Maximum value" },
        { name: "init", type: "number", description: "Default value" },
        {
          name: "show_tooltip",
          type: "boolean",
          description:
            "Boolean. true if the slider should display its current value.",
        },
        {
          name: "unit",
          type: "string",
          description:
            "	String that is two characters or less. This will be appended to the display value. For example, 'px' for pixels or '%' for a percentage.",
        },
        {
          name: "scale",
          type: "number",
          description:
            "The display value will be multiplied by this scale. For example, 0.1 will make a slider with the range [0-1800] show as 0.0-180.0 with one decimal place.",
        },
        {
          name: "tooltip",
          type: "string",
          description:
            "Table used to override the tooltip for the specified values. The key must be within min-max. The value is a string that will be shown instead of the numeric value whenever that value is selected.",
        },
      ]),

      // Selectable
      header("Selectable (Multiselect)"),
      codeBlock("group:selectable(name: string, items: any [, ...])"),
      paramTable([
        { name: "name", type: "string", description: "Item name" },
        {
          name: "items",
          type: "any",
          description:
            "One or more comma separated values that will be added to the selectable. Alternatively, a table of strings that will be added",
        },
      ]),

      // List
      header("List"),
      codeBlock("group:list(name: string, items: any [, ...])"),
      paramTable([
        { name: "name", type: "string", description: "Item name" },
        {
          name: "items",
          type: "any",
          description:
            "One or more comma separated values that will be added to the list. Alternatively, a table of strings that will be added",
        },
      ]),

      // Color Picker
      header("Color Picker"),
      codeBlock("group:color_picker(name: string[, color: color])"),
      paramTable([
        { name: "name", type: "string", description: "Item name" },
        {
          name: "color",
          type: "color",
          description: "Optional. Initial color value",
        },
      ]),

      // Label
      header("Label"),
      codeBlock("group:label(name: string)"),
      paramTable([{ name: "name", type: "string", description: "Label name" }]),

      // Button
      header("Button"),
      codeBlock("group:button(name: string, callback: function)"),
      paramTable([
        { name: "name", type: "string", description: "Item name" },
        {
          name: "callback",
          type: "function",
          description:
            "Callback function to be executed when the button is pressed",
        },
      ]),

      // Input
      header("Input"),
      codeBlock("group:input(name: string)"),
      paramTable([{ name: "name", type: "string", description: "Item name" }]),

      // Hotkey
      header("Hotkey"),
      codeBlock("group:hotkey(name: string)"),
      paramTable([{ name: "name", type: "string", description: "Item name" }]),
    ],
  },

  // --------------------------------------------------------------------------
  // UI OBJECT METHODS
  // --------------------------------------------------------------------------
  "ui-objects": {
    id: "ui-objects",
    title: "UI Object Methods",
    description: "Every UI element supports the following methods:",
    blocks: [
      text("All UI objects support the following methods:"),
      header(":get([option])"),
      text("Returns the element value."),
      subheader(
        "• For multiselect, passing an option checks if it is selected.",
      ),
      codeBlock(`if multi:get("A") then
  -- option A selected
end`),
      header(":set(value)"),
      text("Sets the element value."),
      codeBlock(`--int for the slider
slider:set(50)
--bool for the switch
switch:set(true)
--item name for combo / multiselect
combo:set("A")
multi:set("B")`),

      header(":visible(value)"),
      text("Controls visibility."),
      list([
        "boolean – static visibility",
        "function – dynamic visibility based on custom logic",
        "object – visibility follows another UI object",
      ]),
      codeBlock(`slider:visible(function()
    return enable:get()
end)`),
      text(
        "Calling without arguments returns current visibility (if supported).",
      ),

      header(":callback(func)"),
      text(
        "Sets a callback function that is called when the element value changes.",
      ),
      codeBlock(`switch:callback(function(value)
    print("Switch value changed to", value)
end)`),

      header(":add_callback(event, fn"),
      text("Registers a client event callback."),
      subheader("• For checkboxes, the callback only fires when enabled."),
      codeBlock(`enable:add_callback("paint_ui", function(self)
-- runs every frame while enabled
end)`),
      header(":disabled(state)"),
      text("Enables or disables the element."),
      codeBlock(`-- Disable the slider
slider:disabled(true)
-- Re-enable the slider
slider:disabled(false)`),

      header(":type()"),
      text("Returns the element type"),
      header(":id()"),
      text("Returns the raw UI reference."),

      header("Finding Existing UI Elements"),
      text("You can wrap existing GameSense UI elements:"),
      codeBlock(`local ref = lui.find("misc", "settings", "menu color")`),

      header("Chaining method"),
      text(
        "All UI objects support method chaining, allowing you to configure visibility, callbacks, and events in a single fluent statement.",
      ),
      codeBlock(`local damage = group:slider("Damage", 0, 100, 50)
    :visible(enable)
    :callback(function(obj)
        print("Damage: " .. obj:get())
    end)
    :add_callback("paint", function(obj)
    -- draw something
    end)`),
    ],
  },

  config_system: {
    id: "config_system",
    title: "Config System",
    description: "All registered UI elements are automatically tracked.",
    blocks: [
      header("Save"),
      codeBlock(`local config = lui.save()`),

      header("Load"),
      codeBlock(`lui.load(config)`),

      header("Export (Clipboard)"),
      codeBlock(`lui.export(prefix: string)`),
      paramTable([
        {
          name: "prefix",
          type: "string",
          description: "Prefix to use for exported configs",
        },
      ]),
      text("Exports a Base64‑encoded JSON string to clipboard."),

      header("Import"),
      codeBlock(`lui.import()`),
      list([
        "Reads from clipboard by default",
        "Accepts raw tables or encoded strings",
      ]),

      header("Reset"),
      codeBlock(`lui.reset()`),
      text("Clears all registered elements."),
    ],
  },

  utils: {
    id: "utils",
    title: "Utils",
    description: "A collection of helper functions for common tasks.",
    blocks: [
      header("Velocity"),
      codeBlock(`local speed = utils.get_velocity(entity.get_local_player())`),
      text("Returns 2D movement speed."),

      header("Colored Print"),
      codeBlock(`utils.print(prefix: string, message: string)`),
      paramTable([
        { name: "prefix", type: "string", description: "Message prefix" },
        { name: "message", type: "string", description: "Message content" },
      ]),

      header("Player Name"),
      codeBlock("utils.name()"),
      text("Returns the Steam username."),

      header("Clantag"),
      codeBlock(`utils.clantag("lapi", 0.5)`),
      text("Cycles the clantag text over time."),
    ],
  },

  events_wrapper: {
    id: "events",
    title: "Events Wrapper",
    description: "Events provides a cleaner syntax for client events.",
    blocks: [
      header("Events set"),
      codeBlock(`events.[event_name]:set(function)`),
      paramTable([
        { name: "event_name", type: "string", description: "Event name" },
        {
          name: "function",
          type: "function",
          description: "Callback function",
        },
      ]),
      text("Registers a callback for a client event"),
      text(
        `All ${link("supported events", "https://gamesense-docs.pages.dev/docs/events/aim_fire")} here`,
      ),

      header("Events Unset"),
      codeBlock(`events.[event_name]:unset(function)`),
      paramTable([
        { name: "event_name", type: "string", description: "Event name" },
        {
          name: "function",
          type: "function",
          description: "Callback function",
        },
      ]),
      text("Unregisters a previously registered event callback."),

      header("Note"),
      list([
        "Designed for simplicity, not strict abstraction",
        "Works best as a helper layer, not a full framework",
        "Safe to mix with raw ui, client, and entity calls",
      ]),
    ],
  },

  filesystem: {
    id: "filesystem",
    title: "Filesystem",
    description:
      "Filesystem provides a Lua API for reading, writing, and managing files through the game's native VFileSystem interface.",
    blocks: [
      header("get_game_directory"),
      codeBlock(`filesystem.get_game_directory()`),
      text("Returns the absolute path to the game's root folder."),
      codeBlock(
        `local dir = filesystem.get_game_directory()\n-- "C:/Program Files/.../csgo"`,
      ),

      header("add_search_path"),
      codeBlock(`filesystem.add_search_path(path, path_id, type)`),
      paramTable([
        {
          name: "path",
          type: "string",
          description: "Absolute folder path to mount",
        },
        {
          name: "path_id",
          type: "string",
          description: 'Name to identify this search path (e.g. "GAME")',
        },
        {
          name: "type",
          type: "int",
          description: "Search path type flag, usually 0",
        },
      ]),
      text(
        "Mounts a folder under a named path ID, making it resolvable by other filesystem calls.",
      ),

      header("remove_search_path"),
      codeBlock(`filesystem.remove_search_path(path, path_id)`),
      paramTable([
        {
          name: "path",
          type: "string",
          description: "Absolute folder path to unmount",
        },
        {
          name: "path_id",
          type: "string",
          description: "Search path name to remove",
        },
      ]),
      text("Unmounts a previously registered search path."),

      header("open"),
      codeBlock(`filesystem.open(path, mode, path_id)`),
      paramTable([
        { name: "path", type: "string", description: "Relative file path" },
        {
          name: "mode",
          type: "string",
          description: 'File mode: "r", "w", "a", "rb", "wb", etc.',
        },
        {
          name: "path_id",
          type: "string",
          description: "Search path to resolve the file under",
        },
      ]),
      text(
        "Opens a file and returns a handle. Returns nil if the file could not be opened.",
      ),
      text("Always pair with filesystem.close when done."),

      header("close"),
      codeBlock(`filesystem.close(handle)`),
      paramTable([
        {
          name: "handle",
          type: "userdata",
          description: "File handle returned by filesystem.open",
        },
      ]),
      text(
        "Closes an open file handle. Always call this after reading or writing.",
      ),

      header("read"),
      codeBlock(`filesystem.read(handle)`),
      paramTable([
        {
          name: "handle",
          type: "userdata",
          description: "File handle opened in a readable mode",
        },
      ]),
      text("Reads the entire file content and returns it as a string."),

      header("write"),
      codeBlock(`filesystem.write(handle, ...)`),
      paramTable([
        {
          name: "handle",
          type: "userdata",
          description: "File handle opened in a writable mode",
        },
        {
          name: "...",
          type: "any",
          description: "One or more values to write, concatenated together",
        },
      ]),
      text(
        "Writes one or more values to the file. All arguments are converted with tostring and joined.",
      ),

      header("get_size"),
      codeBlock(`filesystem.get_size(handle)`),
      paramTable([
        { name: "handle", type: "userdata", description: "Open file handle" },
      ]),
      text("Returns the size of the open file in bytes."),

      header("exists"),
      codeBlock(`filesystem.exists(path, path_id)`),
      paramTable([
        {
          name: "path",
          type: "string",
          description: "Relative file path to check",
        },
        {
          name: "path_id",
          type: "string",
          description: "Search path to resolve under",
        },
      ]),
      text("Returns true if the file exists, false otherwise."),

      header("get_time"),
      codeBlock(`filesystem.get_time(path, path_id)`),
      paramTable([
        { name: "path", type: "string", description: "Relative file path" },
        {
          name: "path_id",
          type: "string",
          description: "Search path to resolve under",
        },
      ]),
      text(
        "Returns the last modification time of the file as a Unix timestamp.",
      ),

      header("create_directory"),
      codeBlock(`filesystem.create_directory(path, path_id)`),
      paramTable([
        {
          name: "path",
          type: "string",
          description: "Directory path to create (supports nested paths)",
        },
        {
          name: "path_id",
          type: "string",
          description: "Search path to resolve under",
        },
      ]),
      text(
        "Creates the full directory hierarchy. Safe to call even if the folder already exists.",
      ),

      header("is_directory"),
      codeBlock(`filesystem.is_directory(path, path_id)`),
      paramTable([
        { name: "path", type: "string", description: "Path to check" },
        {
          name: "path_id",
          type: "string",
          description: "Search path to resolve under",
        },
      ]),
      text("Returns true if the given path is a directory."),

      header("remove"),
      codeBlock(`filesystem.remove(path, path_id)`),
      paramTable([
        {
          name: "path",
          type: "string",
          description: "Relative file path to delete",
        },
        {
          name: "path_id",
          type: "string",
          description: "Search path to resolve under",
        },
      ]),
      text("Permanently deletes a file."),

      header("rename"),
      codeBlock(`filesystem.rename(old_path, new_path, path_id)`),
      paramTable([
        { name: "old_path", type: "string", description: "Current file path" },
        { name: "new_path", type: "string", description: "New file path" },
        {
          name: "path_id",
          type: "string",
          description: "Search path to resolve under",
        },
      ]),
      text("Renames or moves a file. Returns true on success."),

      header("list_files"),
      codeBlock(`filesystem.list_files(filesystem, path)`),
      paramTable([
        {
          name: "filesystem",
          type: "table",
          description: "Pass the filesystem table itself as self",
        },
        {
          name: "path",
          type: "string",
          description: "Relative folder path to list",
        },
      ]),
      text(
        "Returns a table of file names (not directories) found inside the given folder.",
      ),
      codeBlock(
        `local files = filesystem.list_files(filesystem, "cfg/mymod")\nfor _, name in ipairs(files) do\n    print(name)\nend`,
      ),

      header("find_first / find_next / find_close"),
      codeBlock(
        `filesystem.find_first(path)\nfilesystem.find_next(handle)\nfilesystem.find_is_directory(handle)\nfind_close(handle)`,
      ),
      paramTable([
        {
          name: "path",
          type: "string",
          description: 'Glob path, e.g. game_dir .. "\\\\cfg\\\\mymod\\\\*"',
        },
        {
          name: "handle",
          type: "userdata",
          description: "Handle returned by find_first",
        },
      ]),
      text(
        "Low-level directory iteration. find_first returns a handle and the first file name. Iterate with find_next until it returns nil, then call find_close.",
      ),
      codeBlock(
        `local handle, name = filesystem.find_first(dir .. "\\\\cfg\\\\mymod\\\\*")\nif handle then\n    repeat\n        print(name)\n        name = filesystem.find_next(handle[0])\n    until not name\n    find_close(handle[0])\nend`,
      ),

      header("Note"),
      list([
        'All paths are relative to the search path ID used (e.g. "GAME" resolves inside the csgo folder)',
        "Always close file handles after use to avoid leaks",
        "find_close is a bare global, not filesystem.find_close — this is a known quirk of the source",
        "Safe to mix with raw vtable_bind calls and other gamesense APIs",
      ]),
    ],
  },
};

// ============================================================================
// NAVIGATION STRUCTURE
// ============================================================================

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
      { id: "config_system", label: "Config System" },
      { id: "utils", label: "Utils" },
      { id: "events_wrapper", label: "Events Wrapper" },
      { id: "filesystem", label: "File System" },
    ],
  },
];
