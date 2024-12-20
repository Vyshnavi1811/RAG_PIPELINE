export const appConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  allowedMimeTypes: ['application/pdf'],
  vectorStore: {
    chunkSize: 1000,
    chunkOverlap: 200,
    modelName: 'Xenova/all-MiniLM-L6-v2',
  },
} as const;