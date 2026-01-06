export type HookReturn =
  /**
   * For the onInput hook, this will replace the text entered by the player.
   * - Returning an empty string in onInput throws an error which is shown to the player and says Unable to run scenario scripts.
   * For the onModelContext hook, this will replace the text sent to the AI.
   * - Returning an empty string in onModelContext causes the context to be built as though the script did not run.
   * For the onOutput hook, this will replace the text returned to the player.
   * - Returning an empty string in onOutput throws an error which is shown to the player and says A custom script running on this scenario failed. Please try again or fix the script.
   * Returning the text stop is equivalent to returning stop: true.
   */
  | { text: string }
  /**
   * If stop === true, then the game loop will not proceed.
   * This is useful in cases where you want a player input to update the state but to not run the AI.
   * When you return stop in the onInput hook, it throws an error which is shown to the player and says Unable to run scenario scripts
   * When you return stop in the onModelContext hook, it throws an error which is shown to the player and says Sorry, the AI is stumped. Edit/retry your previous action, or write something to help it along.
   * When you return stop in the onOutput hook, it changes the output to stop. Don’t do this.
   */
  | { stop: true };
