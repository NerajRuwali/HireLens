import express from 'express';
import upload from '../utils/multerConfig.js';
import { matchJobWithResume } from '../controllers/jobMatchingController.js';

const router = express.Router();

router.post('/match', upload.single('resume'), matchJobWithResume);

export default router;
