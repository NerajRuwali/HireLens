import express from 'express';
import upload from '../utils/multerConfig.js';
import { uploadResume } from '../controllers/resumeController.js';

const router = express.Router();

/**
 * POST /api/resume/upload
 * Uses multer middleware (upload.single('resume')) to handle single file upload
 * Field name matches the requirement: 'resume'
 */
router.post('/upload', upload.single('resume'), uploadResume);

export default router;
