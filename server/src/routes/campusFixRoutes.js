import { Router } from 'express';
import {
  listIssues,
  createIssue,
  triageIssue,
  updateStatus
} from '../controllers/campusFixController.js';

const router = Router();

router.get('/', listIssues);
router.post('/', createIssue);
router.post('/triage', triageIssue);
router.patch('/:id/status', updateStatus);

export default router;
