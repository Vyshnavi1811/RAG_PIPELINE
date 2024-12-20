export function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (normA * normB);
}

export function topK<T>(items: T[], scoreFunc: (item: T) => number, k: number): T[] {
  return [...items]
    .sort((a, b) => scoreFunc(b) - scoreFunc(a))
    .slice(0, k);
}