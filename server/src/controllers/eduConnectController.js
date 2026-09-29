import { store } from '../models/store.js';

export async function listMentors(req, res, next) {
  try {
    const mentors = store.getMentors();
    return res.json({
      success: true,
      data: mentors
    });
  } catch (error) {
    return next(error);
  }
}
