export function splitIntoSentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]+/g) || [text];
}

export function removeExtraWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function estimateTokenCount(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}