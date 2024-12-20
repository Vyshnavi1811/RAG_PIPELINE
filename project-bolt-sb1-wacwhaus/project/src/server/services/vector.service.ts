import { HuggingFaceTransformersEmbeddings } from '@xenova/transformers';

export class VectorStore {
  private embeddings: HuggingFaceTransformersEmbeddings;
  private vectors: Array<{ id: string; vector: number[]; text: string }> = [];

  constructor() {
    this.embeddings = new HuggingFaceTransformersEmbeddings({
      modelName: 'Xenova/all-MiniLM-L6-v2',
    });
  }

  async addDocuments(texts: string[]) {
    const vectors = await Promise.all(
      texts.map(async (text) => {
        const vector = await this.embeddings.embedQuery(text);
        return {
          id: this.generateId(),
          vector,
          text,
        };
      })
    );

    this.vectors.push(...vectors);
    return vectors;
  }

  async similaritySearch(query: string, k: number = 3) {
    const queryVector = await this.embeddings.embedQuery(query);
    
    return this.vectors
      .map(doc => ({
        ...doc,
        score: this.cosineSimilarity(queryVector, doc.vector),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(doc => doc.text);
  }

  private generateId(): string {
    return `vec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normA * normB);
  }
}