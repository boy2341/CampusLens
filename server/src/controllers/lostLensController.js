import { store } from '../models/store.js';

export async function createLost(req, res, next) {
  try {
    const { description, location, imageBase64, mimeType, userId } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A description is required for the lost item.'
      });
    }

    const item = store.createLostItem({
      description,
      location,
      imageBase64,
      mimeType,
      userId: userId || 'demo-user'
    });

    return res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    return next(error);
  }
}

export async function createFound(req, res, next) {
  try {
    const { description, location, imageBase64, mimeType, userId } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A description is required for the found item.'
      });
    }

    const item = store.createFoundItem({
      description,
      location,
      imageBase64,
      mimeType,
      userId: userId || 'demo-finder'
    });

    return res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    return next(error);
  }
}

export async function getMatches(req, res, next) {
  try {
    const { lostItemId } = req.body;

    if (!lostItemId) {
      return res.status(400).json({
        success: false,
        message: 'lostItemId is required to execute visual match search.'
      });
    }

    const lostItem = store.getLostItemById(lostItemId);
    const matches = store.findMatchesForLostItem(lostItem);

    return res.json({
      success: true,
      data: {
        matches
      }
    });
  } catch (error) {
    return next(error);
  }
}

export async function listLost(req, res, next) {
  try {
    const items = store.getLostItems();
    return res.json({
      success: true,
      data: items
    });
  } catch (error) {
    return next(error);
  }
}

export async function listFound(req, res, next) {
  try {
    const items = store.getFoundItems();
    return res.json({
      success: true,
      data: items
    });
  } catch (error) {
    return next(error);
  }
}
