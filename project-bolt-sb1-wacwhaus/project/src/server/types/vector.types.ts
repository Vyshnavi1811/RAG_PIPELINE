export interface VectorDocument {
  id: string;
  vector: number[];
  text: string;
  metadata: {
    fileId: string;
    pageNumber: number;
    [key: string]: unknown;
  };
}

export interface SimilaritySearchResult {
  text: string;
  score: number;
  metadata: VectorDocument['metadata'];
}