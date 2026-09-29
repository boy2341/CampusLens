import { Router } from 'express';
import {
  createLost,
  createFound,
  getMatches,
  listLost,
  listFound
} from '../controllers/lostLensController.js';

const router = Router();

router.post('/lost', createLost);
router.get('/lost', listLost);
router.post('/found', createFound);
router.get('/found', listFound);
router.post('/match', getMatches);

export default router;
