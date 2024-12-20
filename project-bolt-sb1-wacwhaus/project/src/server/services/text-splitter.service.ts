interface TextSplitterOptions {
  chunkSize: number;
  chunkOverlap: number;
}

export class TextSplitter {
  private options: TextSplitterOptions;

  constructor(options: TextSplitterOptions) {
    this.options = options;
  }

  splitText(text: string): string[] {
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    
    let currentChunk: string[] = [];
    let currentLength = 0;

    for (const word of words) {
      if (currentLength + word.length > this.options.chunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
        currentChunk = [];
        currentLength = 0;
      }
      
      currentChunk.push(word);
      currentLength += word.length + 1; // +1 for space
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
    }

    return this.addOverlap(chunks);
  }

  private addOverlap(chunks: string[]): string[] {
    if (chunks.length <= 1) return chunks;

    const result: string[] = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const nextChunk = chunks[i + 1];

      if (nextChunk) {
        const words = chunk.split(/\s+/);
        const nextWords = nextChunk.split(/\s+/);
        const overlapWords = words.slice(-this.options.chunkOverlap);
        
        result.push(chunk);
        result.push([...overlapWords, ...nextWords].join(' '));
      } else {
        result.push(chunk);
      }
    }

    return result;
  }
}