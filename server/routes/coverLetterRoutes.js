import express from 'express';
import upload from '../utils/multerConfig.js';
import { createCoverLetter } from '../controllers/coverLetterController.js';

const router = express.Router();

router.post('/generate', upload.single('resume'), createCoverLetter);

export default router;
