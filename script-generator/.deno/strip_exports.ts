if (Deno.args.length !== 1) {
  console.error(
    "Usage: deno run --allow-read --allow-write strip_exports.ts <file-path>",
  );
  Deno.exit(1);
}
const filePath = Deno.args[0];
const content = await Deno.readTextFile(filePath);
const esmStripped = content.replace(/export\s*\{[\s\S]*\};\n?/m, "");
await Deno.writeTextFile(filePath, esmStripped);
