import wordArray from "./word-array.js";

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LineModel {
  string: string;
  x: number;
  y: number;
}

export interface MultiLineOptions {
  font?: string;
  stroke?: string;
  rect?: IRect;
  lineHeight?: number;
  minFontSize?: number;
  maxFontSize?: number;
}

export default function multiLineCanvas(
  ctx: CanvasRenderingContext2D,
  text: string,
  options: MultiLineOptions = {}
) {
  const DEFAULT_OPTIONS = Object.freeze({
    font: "sans-serif",
    stroke: false,
    verbose: false,
    rect: {
      x: 0,
      y: 0,
      width: ctx.canvas.width,
      height: ctx.canvas.height,
    },
    lineHeight: 1.1,
    minFontSize: 30,
    maxFontSize: 100,
    textAlign: "left",
  });

  const config = {
    ...DEFAULT_OPTIONS,
    ...options,
    rect: {
      ...DEFAULT_OPTIONS.rect,
      ...(options.rect || {}),
    },
  };

  const words = wordArray(text);

  let lines: Array<LineModel> = [];
  let fontSize: number;

  for (
    fontSize = config.minFontSize;
    fontSize <= config.maxFontSize;
    fontSize++
  ) {
    let lineHeight = fontSize * config.lineHeight;

    ctx.font = ` ${fontSize}px ${config.font}`;

    let x = config.rect.x;
    let y = config.rect.y + fontSize;

    lines = [];

    let line = "";

    for (const word of words) {
      const linePlus = `${line}${word} `;

      if (ctx.measureText(linePlus).width > config.rect.width) {
        lines.push({ string: line, x: x, y: y });
        line = `${word} `;
        y += lineHeight;
      } else {
        line = linePlus;
      }
    }

    lines.push({ string: line, x: x, y: y });

    if (y > config.rect.height) {
      break;
    }
  }

  for (const line of lines) {
    config.stroke
      ? ctx.strokeText(line.string.trim(), line.x, line.y)
      : ctx.fillText(line.string.trim(), line.x, line.y);
  }

  return fontSize;
}
