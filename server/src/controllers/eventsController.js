import { store } from '../models/store.js';

export async function listEvents(req, res, next) {
  try {
    const events = store.getEvents();
    return res.json({
      success: true,
      data: events
    });
  } catch (error) {
    return next(error);
  }
}

export async function recommendEvents(req, res, next) {
  try {
    const { interests = [], query = '' } = req.body;
    const recommendations = store.recommendEvents(interests, query);

    return res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    return next(error);
  }
}
