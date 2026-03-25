import express from 'express';
import { buildResume } from '../controllers/builderController.js';

const router = express.Router();

router.post('/generate', buildResume);

export default router;
