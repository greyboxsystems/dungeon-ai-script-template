import MarkdownIt from "markdown-it";
import { Check, Clipboard, createElement } from "lucide";

import "./style.css";

import userGuide from "./content/user-guide.md" with { type: "text" };
import inputScript from "./content/input.js" with { type: "text" };
import contextScript from "./content/context.js" with { type: "text" };
import outputScript from "./content/output.js" with { type: "text" };
import libraryScript from "../dist/library.js" with { type: "text" };

const clipboardIcon = createElement(Clipboard);
clipboardIcon.setAttribute("width", "16");
clipboardIcon.setAttribute("height", "16");
clipboardIcon.setAttribute("stroke", "currentColor");

const checkIcon = createElement(Check);
checkIcon.setAttribute("width", "16");
checkIcon.setAttribute("height", "16");
checkIcon.setAttribute("stroke", "currentColor");

const root = (() => {
  const res = document.getElementById("root");
  if (!res) {
    throw new Error("Missing #root element");
  }
  return res;
})();

root.className = "markdown-body";

const md = new MarkdownIt({
  html: true, // allow raw HTML (Copy button)
  linkify: true,
  typographer: true,
});

function renderUserGuide(): void {
  root.innerHTML = md.render(userGuide);
}

function setupCopyButtons(): void {
  const buttonIds = [
    "copy-input",
    "copy-context",
    "copy-output",
    "copy-library",
  ] as const;

  const scripts = {
    "copy-input": inputScript,
    "copy-context": contextScript,
    "copy-output": outputScript,
    "copy-library": libraryScript,
  } satisfies { [K in typeof buttonIds[number]]: string };

  for (const id of buttonIds) {
    const button = document.getElementById(id);
    if (!button) {
      throw new Error(`Missing ${id} button`);
    }

    button.className = "copy-btn clipboard";
    button.innerHTML = "";
    button.appendChild(clipboardIcon.cloneNode(true));

    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(scripts[id]);

      button.innerHTML = "";
      button.appendChild(checkIcon.cloneNode(true));
      button.className = "copy-btn copied";

      setTimeout(() => {
        button.innerHTML = "";
        button.appendChild(clipboardIcon.cloneNode(true));
        button.className = "copy-btn clipboard";
      }, 1500);
    });
  }
}

renderUserGuide();
setupCopyButtons();
