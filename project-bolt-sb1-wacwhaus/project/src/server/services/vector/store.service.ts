import { VectorDocument, SimilaritySearchResult } from '../../types/vector.types';
import { EmbeddingService } from './embedding.service';
import { cosineSimilarity, topK } from '../../utils/vector.utils';

export class VectorStoreService {
  private vectors: VectorDocument[] = [];
  private embeddings: EmbeddingService;

  constructor() {
    this.embeddings = new EmbeddingService();
  }

  async addDocuments(texts: string[], metadata: VectorDocument['metadata'][]): Promise<string[]> {
    const embeddings = await this.embeddings.embedBatch(texts);
    
    const documents = embeddings.map((vector, i) => ({
      id: `vec_${Date.now()}_${i}`,
      vector,
      text: texts[i],
      metadata: metadata[i],
    }));

    this.vectors.push(...documents);
    return documents.map(doc => doc.id);
  }

  async search(query: string, k: number = 3): Promise<SimilaritySearchResult[]> {
    const queryVector = await this.embeddings.embedText(query);
    
    return topK(
      this.vectors.map(doc => ({
        text: doc.text,
        score: cosineSimilarity(queryVector, doc.vector),
        metadata: doc.metadata,
      })),
      result => result.score,
      k
    );
  }
}