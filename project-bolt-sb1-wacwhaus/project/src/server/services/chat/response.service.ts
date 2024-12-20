import { ChatMessage, ChatResponse } from '../../types/chat.types';
import { VectorStoreService } from '../vector/store.service';
import { generateId } from '../../utils/file.utils';

export class ChatResponseService {
  private vectorStore: VectorStoreService;

  constructor(vectorStore: VectorStoreService) {
    this.vectorStore = vectorStore;
  }

  async generateResponse(query: string): Promise<ChatResponse> {
    const relevantDocs = await this.vectorStore.search(query);
    
    // TODO: Integrate with actual LLM
    const response = `This is a mock response based on ${relevantDocs.length} relevant documents.`;

    return {
      message: {
        id: generateId('msg_'),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      },
      sources: relevantDocs.map(doc => ({
        text: doc.text,
        metadata: doc.metadata,
      })),
    };
  }
}