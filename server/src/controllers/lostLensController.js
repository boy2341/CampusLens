import { store } from '../models/store.js';
import { extractVisualFingerprintWithGemini, compareItemsWithGemini } from '../services/geminiService.js';

export async function createLost(req, res, next) {
  try {
    const { description, location, imageBase64, mimeType, userId } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A description is required for the lost item.'
      });
    }

    // Attempt Gemini visual/textual fingerprint extraction
    const geminiFingerprint = await extractVisualFingerprintWithGemini({
      imageBase64,
      mimeType,
      description,
      location
    });

    const item = store.createLostItem({
      description,
      location,
      imageBase64,
      mimeType,
      userId: userId || 'demo-user',
      fingerprint: geminiFingerprint || undefined
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

    // Attempt Gemini visual/textual fingerprint extraction
    const geminiFingerprint = await extractVisualFingerprintWithGemini({
      imageBase64,
      mimeType,
      description,
      location
    });

    const item = store.createFoundItem({
      description,
      location,
      imageBase64,
      mimeType,
      userId: userId || 'demo-finder',
      fingerprint: geminiFingerprint || undefined
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

    // If matches found and Gemini is online, enhance top match with Gemini multimodal reasoning
    if (matches.length > 0 && lostItem) {
      const top = matches[0];
      const geminiCompare = await compareItemsWithGemini({
        lostItem,
        foundItem: top.foundItem
      });

      if (geminiCompare) {
        if (geminiCompare.similarityEstimate) {
          top.similarityEstimate = geminiCompare.similarityEstimate;
        }
        if (geminiCompare.reasons?.length) {
          top.reasons = geminiCompare.reasons;
        }
        if (geminiCompare.differences?.length) {
          top.differences = geminiCompare.differences;
        }
        if (geminiCompare.explanation) {
          top.explanation = geminiCompare.explanation;
        }
      }
    }

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
