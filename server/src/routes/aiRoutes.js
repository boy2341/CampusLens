import { Router } from 'express';
import { postIntent, postAnalyzeImage } from '../controllers/aiController.js';

const router = Router();

router.post('/intent', postIntent);
router.post('/analyze-image', postAnalyzeImage);

export default router;
