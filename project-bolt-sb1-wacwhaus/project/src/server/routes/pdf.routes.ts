import { Router } from 'express';
import multer from 'multer';
import { uploadPDF, processPDF } from '../controllers/pdf.controller';
import { validatePDFUpload } from '../middleware/validation.middleware';

const router = Router();
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

router.post('/upload', upload.array('files', 5), validatePDFUpload, uploadPDF);
router.post('/process/:fileId', processPDF);

export { router };