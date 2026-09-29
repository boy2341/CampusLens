import { Router } from 'express';
import { listMentors } from '../controllers/eduConnectController.js';

const router = Router();

router.get('/mentors', listMentors);

export default router;
