const CJK_CHARS = /[\u3400-\u9FBF]/;
const PUNTACTION =
  /[\uFF01-\uFF07,\u0021,\u003F,\u002E,\u002C,\u003A,\u003B,\uFF1A-\uFF1F,\u3002,\uFF0C-\uFF0E,\u2000-\u206F,\uFFED-\uFFEF,\u0028,\u0029]/;
const RETURNS_AND_LINES = /(\r\n|\n|\r)/gm;
const SPACE_REG = /\s+/g;

const SPACE_CHAR = " ";

export default function wordArray(text: string) {
  if (CJK_CHARS.test(text)) {
    const words: Array<string> = [];
    const characters = text.split("");

    for (let i = 0; i <= characters.length - 1; i++) {
      if (!containsPunctations(characters[i + 1])) {
        words.push(characters[i]);
      } else {
        words.push(characters[i] + characters[i + 1]);
        i++;
      }
    }

    return words;
  }

  const cleaned = text
    .replace(RETURNS_AND_LINES, SPACE_CHAR)
    .replace(SPACE_REG, SPACE_CHAR);

  return cleaned.split(SPACE_CHAR);
}

function containsPunctations(text: string) {
  return PUNTACTION.test(text);
}
