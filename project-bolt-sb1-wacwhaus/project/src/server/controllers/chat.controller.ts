import { Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import { VectorStore } from '../services/vector.service';
import { ApiError } from '../utils/errors';

export const processQuery = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    
    const vectorStore = new VectorStore();
    const chatService = new ChatService();

    // Retrieve relevant chunks
    const relevantChunks = await vectorStore.similaritySearch(query);
    
    // Generate response
    const response = await chatService.generateResponse(query, relevantChunks);

    res.json({ success: true, response });
  } catch (error) {
    throw new ApiError(500, 'Error processing chat query');
  }
};