import express from 'express';
import cors from 'cors';
import { router as pdfRouter } from './routes/pdf.routes';
import { router as chatRouter } from './routes/chat.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pdf', pdfRouter);
app.use('/api/chat', chatRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});