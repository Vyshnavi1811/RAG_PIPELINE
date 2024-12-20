import { Router } from 'express';
import { processQuery } from '../controllers/chat.controller';
import { validateChatQuery } from '../middleware/validation.middleware';

const router = Router();

router.post('/query', validateChatQuery, processQuery);

export { router };