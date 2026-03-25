import express from 'express';
import { getSalaryEstimate } from '../controllers/salaryController.js';

const router = express.Router();

router.post('/estimate', getSalaryEstimate);

export default router;
