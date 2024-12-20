export interface ProcessedPDF {
  id: string;
  name: string;
  pageCount: number;
  text: string;
}

export interface PDFChunk {
  id: string;
  fileId: string;
  content: string;
  pageNumber: number;
  metadata: Record<string, unknown>;
}