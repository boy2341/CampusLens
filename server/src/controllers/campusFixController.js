import { store } from '../models/store.js';

export async function triageIssue(req, res, next) {
  try {
    const { note = '', location = 'Science Block · B-204' } = req.body;
    const lower = note.toLowerCase();

    let issueType = 'Classroom Hardware Maintenance';
    let category = 'Facilities';
    let severity = 'MEDIUM';
    let description = 'Maintenance ticket triaged by vision & text analysis engine.';
    let suggestedDepartment = 'Facilities Maintenance';

    if (lower.includes('fan') || lower.includes('noise') || lower.includes('loose') || lower.includes('blade')) {
      issueType = 'Ceiling Fan Wobble & Loose Blade';
      category = 'Electrical & Mechanical Maintenance';
      severity = 'HIGH';
      description = 'Ceiling fan assembly exhibits rotation imbalance and loose mounting hardware, presenting an acoustic disturbance and falling hazard.';
      suggestedDepartment = 'Electrical & Maintenance Engineering';
    } else if (lower.includes('leak') || lower.includes('water') || lower.includes('pipe') || lower.includes('washroom')) {
      issueType = 'Water Leakage & Drainage Overflow';
      category = 'Plumbing Maintenance';
      severity = 'HIGH';
      description = 'Plumbing pressure failure causing standing water and slippery surface hazard.';
      suggestedDepartment = 'Plumbing Services';
    } else if (lower.includes('light') || lower.includes('flicker') || lower.includes('bulb')) {
      issueType = 'Flickering Fluorescent Lighting';
      category = 'Electrical Maintenance';
      severity = 'MEDIUM';
      description = 'Ballast or fixture malfunction resulting in rapid strobing and classroom distraction.';
      suggestedDepartment = 'Campus Electrical';
    } else if (lower.includes('chair') || lower.includes('desk') || lower.includes('bench')) {
      issueType = 'Damaged Classroom Furniture';
      category = 'Furniture & Carpentry';
      severity = 'LOW';
      description = 'Physical structural defect on seating or study surface.';
      suggestedDepartment = 'Carpentry & Facilities';
    }

    return res.json({
      success: true,
      data: {
        issueType,
        category,
        severity,
        description,
        suggestedDepartment,
        location
      }
    });
  } catch (error) {
    return next(error);
  }
}

export async function createIssue(req, res, next) {
  try {
    const { issueType, category, severity, location, description, image } = req.body;

    const issue = store.createIssue({
      issueType: issueType || 'Facilities Maintenance Request',
      category: category || 'General Maintenance',
      severity: severity || 'MEDIUM',
      location: location || 'Campus Block',
      description: description || 'Reported maintenance requirement.',
      image
    });

    return res.status(201).json({
      success: true,
      data: issue
    });
  } catch (error) {
    return next(error);
  }
}

export async function listIssues(req, res, next) {
  try {
    const issues = store.getIssues();
    return res.json({
      success: true,
      data: issues
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status value is required.'
      });
    }

    const updated = store.updateIssueStatus(id, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Issue with ID ${id} not found.`
      });
    }

    return res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    return next(error);
  }
}
