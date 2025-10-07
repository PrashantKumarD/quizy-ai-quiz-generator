import express from 'express';
import {generateQuestions , generateFeedback} from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate', generateQuestions);
router.post('/feedback', generateFeedback);

export default router;