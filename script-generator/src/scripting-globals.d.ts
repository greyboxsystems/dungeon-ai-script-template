// scripting-globals.d.ts
import type { MyScriptState } from "./main.ts";

declare global {
  /**
   * For the onInput hook, this field has the text entered by the player.
   * For the onModelContext hook, this field has the text that would otherwise be sent to the AI.
   * For the onOutput hook, this field has the text that would otherwise be sent back to the player.
   */
  const text: string;

  /**
   * Array of recent actions from the adventure.
   */
  const history: Action[];

  /**
   * Story cards
   */
  const storyCards: StoryCard[];

  /**
   * Persistent mutable state to store additional persistent information to be available across turns.
   */
  const state: { [K in keyof ScriptState]: ScriptState[K] } & unknown;

  /**
   * Misc hook-specific info
   */
  const info: HookInfo;

  /**
   * Logs information to the console.
   * `console.log` is also supported at runtime.
   */
  function log(...args: unknown[]): void;

  /**
   * Adds a new story card.
   * Returns the index of the new card, or false if a card with the same keys already exists.
   */
  function addStoryCard(
    keys: string[],
    entry: string,
    type?: string,
  ): number | false;

  /**
   * Removes a story card by index.
   * Throws an error if the card does not exist.
   */
  function removeStoryCard(index: number): void;

  /**
   * Updates an existing story card.
   * Throws an error if the card does not exist.
   */
  function updateStoryCard(
    index: number,
    keys: string[],
    entry: string,
    type?: string,
  ): void;
}

export type Action = {
  text: string;
  type:
    | "start" // the first action of an adventure
    | "continue" // an action created by the AI
    | "do" // a do action submitted by a player
    | "say" // a say action submitted by a player
    | "story" // a story action submitted by a player
    | "see" // a see action submitted by a player
    | string;
};

export type StoryCard = {
  id: number;
  keys: string[]; // keys that should cause the story card to be included in the model context
  entry: string; // the text that should be included in the model context if the story card is included
  type?: string; // a text field that can be used to separate story cards into categories
};

export type ScriptState = {
  /**
   * Current memory for the adventure
   * Note that setting the context or authorsNote here will take precedence over the memory or authors
   *  note from the UI, but will not update them.
   * If the context  or authorsNote is not set or is set to an empty string, then the settings from the
   * UI will still be used, so it is not possible to use the state to clear the memory or authors note completely.
   * Any updates made to the memory in the onOutput hook will not have any affect until the next player action.
   */
  memory: {
    context?: string; // added to the beginning of the context, before the history. Corresponds to the Memory available in the UI.
    authorsNote?: string; // added close to the end of the context, immediately before the most recent AI response. Corresponds to the Authors Note available in the UI.
    frontMemory?: unknown; // added to the very end of the context, after the most recent player input.
  };
  message?: string; // a string which will be shown to the user.
} & MyScriptState;

export type HookInfo = {
  /* All hooks */
  characterNames: string[]; // an array of character names for players of a multiplayer adventure
  actionCount: number; // the total number of actions in the adventure

  /* onModelContext only */
  maxChars?: number; // estimated maximum number of characters that can be included in the model context (character per token can vary)
  memoryLength?: number; // the number of characters included in the model context from the memory
};
