# Dungeon AI Script Template

## Overview

Dungeon AI script builder template

This repository contains the source code and build system used to produce a
single distributable JavaScript file for AI Dungeon scenarios.

## Development

This project targets Deno 2.6. You can install Deno normally, or download the
Deno executable and run it from the project folder (no system-wide install
required). Placing the executable in the project directory or invoking it by
absolute path works fine (it runs in user space).

To produce the single distributable used by AI Dungeon, run `deno task build`.
This task bundles the TypeScript sources under `src/` and writes a well-formed
`dist/library.js` file suitable for pasting into the AI Dungeon Library panel.

### Note

Deno's bundler parses the code into an abstract syntax tree, resolves and
inlines imports, and then re-emits JavaScript from that tree.

During this process, some comments may be removed or relocated, internal symbols
may be renamed, and formatting may change.

To mitigate the loss of comments during bundling, important documentation can be
attached directly to real syntax nodes that the bundler must preserve. In
practice, this means placing comments as JSDoc on classes, methods, or
properties, or keeping explanatory comments inside class or object bodies rather
than at the top of the file or between statements.

If verbatim top-of-file documentation is required, another option is to add it
as a post-bundle header or export dummy string variables containing comments for
users.

## Contributing

Small focused PRs are welcome.
