import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ApiError } from '../utils/errors';

const chatQuerySchema = z.object({
  query: z.string().min(1).max(1000),
});

export const validateChatQuery = (req: Request, res: Response, next: NextFunction) => {
  try {
    chatQuerySchema.parse(req.body);
    next();
  } catch (error) {
    throw new ApiError(400, 'Invalid chat query');
  }
};

export const validatePDFUpload = (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    throw new ApiError(400, 'No files uploaded');
  }

  if (files.length > 5) {
    throw new ApiError(400, 'Maximum 5 files allowed');
  }

  for (const file of files) {
    if (file.mimetype !== 'application/pdf') {
      throw new ApiError(400, 'Only PDF files are allowed');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new ApiError(400, 'File size exceeds 10MB limit');
    }
  }

  next();
};