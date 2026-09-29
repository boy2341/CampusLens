import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import aiRoutes from './aiRoutes.js';
import lostLensRoutes from './lostLensRoutes.js';
import eventsRoutes from './eventsRoutes.js';
import campusFixRoutes from './campusFixRoutes.js';
import eduConnectRoutes from './eduConnectRoutes.js';

const router = Router();

// Health check endpoint
router.get('/health', getHealth);

// Core CampusLens feature routers
router.use('/ai', aiRoutes);
router.use('/lostlens', lostLensRoutes);
router.use('/events', eventsRoutes);
router.use('/campusfix', campusFixRoutes);
router.use('/educonnect', eduConnectRoutes);

// Semantic REST aliases matching the new.md specification
router.use('/lost-items', lostLensRoutes);
router.use('/found-items', lostLensRoutes);
router.use('/issues', campusFixRoutes);

export default router;
