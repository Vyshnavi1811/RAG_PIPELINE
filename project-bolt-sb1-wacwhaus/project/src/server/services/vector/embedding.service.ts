import { HuggingFaceTransformersEmbeddings } from '@xenova/transformers';
import { appConfig } from '../../config/app.config';

export class EmbeddingService {
  private model: HuggingFaceTransformersEmbeddings;
  private modelPromise: Promise<void>;

  constructor() {
    this.model = new HuggingFaceTransformersEmbeddings({
      modelName: appConfig.vectorStore.modelName,
    });
    this.modelPromise = this.initializeModel();
  }

  private async initializeModel(): Promise<void> {
    await this.model.init();
  }

  async embedText(text: string): Promise<number[]> {
    await this.modelPromise;
    return this.model.embedQuery(text);
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    await this.modelPromise;
    return Promise.all(texts.map(text => this.embedText(text)));
  }
}