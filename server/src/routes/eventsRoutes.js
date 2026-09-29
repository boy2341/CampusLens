import { Router } from 'express';
import { listEvents, recommendEvents } from '../controllers/eventsController.js';

const router = Router();

router.get('/', listEvents);
router.post('/recommend', recommendEvents);

export default router;
