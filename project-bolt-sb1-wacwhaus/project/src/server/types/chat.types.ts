export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatResponse {
  message: ChatMessage;
  sources: Array<{
    text: string;
    metadata: Record<string, unknown>;
  }>;
}