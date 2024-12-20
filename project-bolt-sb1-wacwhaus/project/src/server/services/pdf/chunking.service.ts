import { PDFChunk } from '../../types/pdf.types';
import { generateId } from '../../utils/file.utils';
import { splitIntoSentences } from '../../utils/text.utils';
import { appConfig } from '../../config/app.config';

export class PDFChunkingService {
  private chunkSize: number;
  private overlap: number;

  constructor() {
    this.chunkSize = appConfig.vectorStore.chunkSize;
    this.overlap = appConfig.vectorStore.chunkOverlap;
  }

  createChunks(fileId: string, text: string): PDFChunk[] {
    const sentences = splitIntoSentences(text);
    const chunks: PDFChunk[] = [];
    let currentChunk: string[] = [];
    let currentLength = 0;

    for (const sentence of sentences) {
      if (currentLength + sentence.length > this.chunkSize && currentChunk.length > 0) {
        chunks.push(this.createChunk(fileId, currentChunk.join(' ')));
        currentChunk = this.getOverlappingSentences(currentChunk);
        currentLength = currentChunk.join(' ').length;
      }
      
      currentChunk.push(sentence);
      currentLength += sentence.length;
    }

    if (currentChunk.length > 0) {
      chunks.push(this.createChunk(fileId, currentChunk.join(' ')));
    }

    return chunks;
  }

  private createChunk(fileId: string, content: string): PDFChunk {
    return {
      id: generateId('chunk_'),
      fileId,
      content,
      pageNumber: 1, // TODO: Implement page tracking
      metadata: {},
    };
  }

  private getOverlappingSentences(sentences: string[]): string[] {
    const text = sentences.join(' ');
    const overlapSize = Math.min(this.overlap, text.length);
    const overlapText = text.slice(-overlapSize);
    return splitIntoSentences(overlapText);
  }
}