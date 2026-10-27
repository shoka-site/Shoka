import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type Rgb = [number, number, number];

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

function themeBlock(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`));

  if (!match) {
    throw new Error(`Could not find theme block: ${selector}`);
  }

  return match[1];
}

function hslToken(block: string, name: string): Rgb {
  const match = block.match(
    new RegExp(
      `--${name}:\\s*hsl\\(([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%(?:\\s*\\/\\s*[\\d.]+)?\\)`
    )
  );

  if (!match) {
    throw new Error(`Could not find HSL token: --${name}`);
  }

  return hslToRgb(Number(match[1]), Number(match[2]), Number(match[3]));
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lightness - chroma / 2;

  let rgb: Rgb;
  if (h < 60) rgb = [chroma, x, 0];
  else if (h < 120) rgb = [x, chroma, 0];
  else if (h < 180) rgb = [0, chroma, x];
  else if (h < 240) rgb = [0, x, chroma];
  else if (h < 300) rgb = [x, 0, chroma];
  else rgb = [chroma, 0, x];

  return rgb.map((channel) => Math.round((channel + m) * 255)) as Rgb;
}

function luminance(rgb: Rgb): number {
  const [r, g, b] = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: Rgb, background: Rgb): number {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a
  );

  return (lighter + 0.05) / (darker + 0.05);
}

const textPairs: Array<[string, string]> = [
  ["foreground", "background"],
  ["foreground", "card"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["primary", "background"],
  ["primary", "card"],
  ["primary-foreground", "primary"],
  ["primary-subtle-foreground", "primary-subtle"],
  ["secondary-foreground", "secondary"],
  ["accent-foreground", "accent"],
  ["destructive-foreground", "destructive"],
  ["success-foreground", "success"],
  ["warning-foreground", "warning"],
  ["info-foreground", "info"],
];

describe.each([
  ["light", ":root"],
  ["dark", ".dark"],
])("%s theme contrast", (_theme, selector) => {
  const block = themeBlock(selector);

  it.each(textPairs)("%s on %s meets WCAG AA", (foreground, background) => {
    const ratio = contrast(hslToken(block, foreground), hslToken(block, background));

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("focus ring meets 3:1 against the page background", () => {
    const ratio = contrast(hslToken(block, "ring"), hslToken(block, "background"));

    expect(ratio).toBeGreaterThanOrEqual(3);
  });
});
