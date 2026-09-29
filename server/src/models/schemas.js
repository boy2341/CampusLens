import mongoose from 'mongoose';

const LostItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, default: 'demo-user' },
  image: { type: String },
  description: { type: String, required: true },
  location: { type: String },
  date: { type: String },
  fingerprint: { type: Object },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const FoundItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, default: 'demo-finder' },
  image: { type: String },
  description: { type: String, required: true },
  location: { type: String },
  date: { type: String },
  fingerprint: { type: Object },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const EventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  category: { type: String },
  date: { type: String },
  time: { type: String },
  location: { type: String },
  organizer: { type: String }
});

const IssueSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, default: 'demo-reporter' },
  image: { type: String },
  issueType: { type: String, required: true },
  category: { type: String },
  severity: { type: String, default: 'MEDIUM' },
  location: { type: String },
  description: { type: String },
  status: { type: String, default: 'REPORTED' },
  createdAt: { type: Date, default: Date.now }
});

export const LostItemModel = mongoose.models.LostItem || mongoose.model('LostItem', LostItemSchema);
export const FoundItemModel = mongoose.models.FoundItem || mongoose.model('FoundItem', FoundItemSchema);
export const EventModel = mongoose.models.Event || mongoose.model('Event', EventSchema);
export const IssueModel = mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
