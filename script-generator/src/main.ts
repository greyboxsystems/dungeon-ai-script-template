import type { HookReturn } from "./types.d.ts";
import type { ForbidKeys } from "./utils.ts";

export type MyScriptState = ForbidKeys<{
  // Add here the script state definition
}, "memory" | "message">;

function onInput(): HookReturn {
  return { text: "" };
}

function onModelContext(): HookReturn {
  return { text: "" };
}

function onOutput(): HookReturn {
  return { text: "" };
}

export const myScript = {
  onInput,
  onModelContext,
  onOutput,
};
