import he from "he";

export default function decodeHtmlEntity(htmlString: string): string {
  return he.decode(htmlString);
}
