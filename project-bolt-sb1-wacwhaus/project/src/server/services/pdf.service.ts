import { readFile } from 'fs/promises';
import pdf from 'pdf-parse';
import { TextSplitter } from './text-splitter.service';
import { ApiError } from '../utils/errors';

export class PDFProcessor {
  private textSplitter: TextSplitter;

  constructor() {
    this.textSplitter = new TextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
  }

  async processFile(file: Express.Multer.File) {
    try {
      const buffer = file.buffer;
      const data = await pdf(buffer);
      return {
        id: this.generateFileId(),
        name: file.originalname,
        pageCount: data.numpages,
        text: data.text,
      };
    } catch (error) {
      throw new ApiError(500, `Error processing PDF: ${error.message}`);
    }
  }

  async extractChunks(fileId: string) {
    try {
      // In a real implementation, we would retrieve the file content from storage
      const text = await this.getFileContent(fileId);
      return this.textSplitter.splitText(text);
    } catch (error) {
      throw new ApiError(500, `Error extracting chunks: ${error.message}`);
    }
  }

  private generateFileId(): string {
    return `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async getFileContent(fileId: string): Promise<string> {
    // Mock implementation - replace with actual storage retrieval
    return "Sample PDF content";
  }
}