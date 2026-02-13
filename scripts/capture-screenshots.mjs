#!/usr/bin/env node

/**
 * Captures screenshots of each tool's subdomain using Playwright.
 * Run via: npm run screenshots
 *
 * If Playwright browsers are not installed, existing screenshots are kept as-is.
 * Pre-seed public/screenshots/ with .svg placeholders for local dev.
 */

import { mkdir, writeFile, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "screenshots");

async function getTools() {
  const src = await readFile(join(ROOT, "src", "data", "tools.ts"), "utf-8");
  const regex = /\{\s*name:\s*"([^"]+)"[\s\S]*?subdomain:\s*"([^"]+)"[\s\S]*?\}/g;
  const tools = [];
  let m;
  while ((m = regex.exec(src))) {
    tools.push({ name: m[1], subdomain: m[2] });
  }
  return tools;
}

function placeholderSvg(name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
  <rect width="1280" height="800" fill="#18181b"/>
  <text x="640" y="400" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" fill="#a1a1aa">${name}</text>
</svg>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const tools = await getTools();
  console.log(`Processing ${tools.length} tools...`);

  let browser;
  try {
    const { chromium } = await import("playwright");
    browser = await chromium.launch();
  } catch (err) {
    console.warn(`Playwright not available (${err.message}).`);
    console.warn("Ensuring placeholders exist...");
    for (const tool of tools) {
      const pngPath = join(OUT_DIR, `${tool.subdomain}.png`);
      await writeFile(pngPath, placeholderSvg(tool.name));
      console.log(`  ${tool.subdomain}.png: placeholder ready`);
    }
    return;
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: "dark",
  });

  for (const tool of tools) {
    const url = `https://${tool.subdomain}.buidl.org`;
    const pngPath = join(OUT_DIR, `${tool.subdomain}.png`);
    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.screenshot({ path: pngPath, type: "png" });
      await page.close();
      console.log(`  ${tool.subdomain}: screenshot captured`);
    } catch (err) {
      console.warn(`  ${tool.subdomain}: capture failed (${err.message}), keeping placeholder`);
    }
  }

  await browser.close();
  console.log("Done.");
}

main().catch(console.error);
