import { Request, Response } from 'express';
import { PDFProcessor } from '../services/pdf.service';
import { VectorStore } from '../services/vector.service';
import { ApiError } from '../utils/errors';

export const uploadPDF = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      throw new ApiError(400, 'No files uploaded');
    }

    const processor = new PDFProcessor();
    const results = await Promise.all(
      files.map(file => processor.processFile(file))
    );

    res.json({ success: true, files: results });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error processing PDF files');
  }
};

export const processPDF = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    const processor = new PDFProcessor();
    const vectorStore = new VectorStore();

    const chunks = await processor.extractChunks(fileId);
    const vectors = await vectorStore.addDocuments(chunks);

    res.json({ success: true, chunks: chunks.length, vectors: vectors.length });
  } catch (error) {
    throw new ApiError(500, 'Error processing PDF content');
  }
};