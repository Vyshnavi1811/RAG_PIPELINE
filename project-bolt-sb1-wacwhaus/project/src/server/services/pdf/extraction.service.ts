import pdf from 'pdf-parse';
import { ProcessedPDF } from '../../types/pdf.types';
import { generateId } from '../../utils/file.utils';
import { removeExtraWhitespace } from '../../utils/text.utils';

export class PDFExtractionService {
  async extractText(buffer: Buffer, filename: string): Promise<ProcessedPDF> {
    try {
      const data = await pdf(buffer);
      
      return {
        id: generateId('pdf_'),
        name: filename,
        pageCount: data.numpages,
        text: removeExtraWhitespace(data.text),
      };
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }
}