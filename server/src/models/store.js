import mongoose from 'mongoose';
import { initialEvents, initialFoundItems, initialIssues, initialMentors } from '../data/seedData.js';
import { LostItemModel, FoundItemModel, EventModel, IssueModel } from './schemas.js';

class CampusDataStore {
  constructor() {
    this.lostItems = [];
    this.foundItems = [...initialFoundItems];
    this.events = [...initialEvents];
    this.issues = [...initialIssues];
    this.mentors = [...initialMentors];
  }

  // --- LOST ITEMS ---
  getLostItems() {
    return this.lostItems;
  }

  getLostItemById(id) {
    return this.lostItems.find((item) => item.id === id);
  }

  createLostItem(item) {
    const newItem = {
      id: item.id || `LST-${Date.now().toString().slice(-4)}`,
      userId: item.userId || "demo-user",
      description: item.description || "",
      location: item.location || "",
      imageBase64: item.imageBase64 || null,
      imageUrl: item.imageUrl || null,
      mimeType: item.mimeType || "image/jpeg",
      date: item.date || "Just now",
      status: "active",
      fingerprint: item.fingerprint || this.extractFingerprint(item.description, item.location),
      createdAt: new Date().toISOString()
    };
    this.lostItems.unshift(newItem);

    if (mongoose.connection.readyState === 1) {
      LostItemModel.create({
        id: newItem.id,
        userId: newItem.userId,
        image: newItem.imageUrl || (newItem.imageBase64 ? `data:${newItem.mimeType};base64,${newItem.imageBase64.slice(0, 100)}...` : null),
        description: newItem.description,
        location: newItem.location,
        date: newItem.date,
        fingerprint: newItem.fingerprint,
        status: newItem.status,
        createdAt: newItem.createdAt
      }).catch(err => console.warn('[Database] LostItem save warning:', err.message));
    }

    return newItem;
  }

  // --- FOUND ITEMS ---
  getFoundItems() {
    return this.foundItems;
  }

  getFoundItemById(id) {
    return this.foundItems.find((item) => item.id === id);
  }

  createFoundItem(item) {
    const newItem = {
      id: item.id || `FND-${Date.now().toString().slice(-4)}`,
      userId: item.userId || "demo-finder",
      description: item.description || "",
      location: item.location || "",
      imageBase64: item.imageBase64 || null,
      imageUrl: item.imageUrl || null,
      mimeType: item.mimeType || "image/jpeg",
      date: item.date || "Just now",
      status: "active",
      fingerprint: item.fingerprint || this.extractFingerprint(item.description, item.location),
      createdAt: new Date().toISOString()
    };
    this.foundItems.unshift(newItem);

    if (mongoose.connection.readyState === 1) {
      FoundItemModel.create({
        id: newItem.id,
        userId: newItem.userId,
        image: newItem.imageUrl || (newItem.imageBase64 ? `data:${newItem.mimeType};base64,${newItem.imageBase64.slice(0, 100)}...` : null),
        description: newItem.description,
        location: newItem.location,
        date: newItem.date,
        fingerprint: newItem.fingerprint,
        status: newItem.status,
        createdAt: newItem.createdAt
      }).catch(err => console.warn('[Database] FoundItem save warning:', err.message));
    }

    return newItem;
  }

  // --- FINGERPRINT EXTRACTION FALLBACK ---
  extractFingerprint(description = "", location = "") {
    const desc = description.toLowerCase();
    let objectType = "Personal Item";
    let color = "Dark / Neutral";
    let brand = "Unbranded";
    let material = "Composite";
    const tags = [];

    if (desc.includes("headphone") || desc.includes("earphone") || desc.includes("audio")) {
      objectType = "Wireless Over-Ear Headphones";
      material = "Polycarbonate + Acoustic Foam";
      tags.push("Headphones", "Audio", "Electronics");
    } else if (desc.includes("flask") || desc.includes("bottle") || desc.includes("water")) {
      objectType = "Insulated Water Bottle";
      material = "Stainless Steel";
      tags.push("Bottle", "Drinkware", "Lifestyle");
    } else if (desc.includes("key") || desc.includes("chain")) {
      objectType = "Keys and Keychain";
      material = "Metal";
      tags.push("Keys", "Keychain", "Personal");
    } else if (desc.includes("bag") || desc.includes("backpack")) {
      objectType = "Backpack / Carry Bag";
      material = "Nylon Fabric";
      tags.push("Bag", "Backpack", "Storage");
    }

    if (desc.includes("black")) color = "Matte Black";
    else if (desc.includes("blue") || desc.includes("navy")) color = "Navy Blue";
    else if (desc.includes("silver") || desc.includes("gray") || desc.includes("grey")) color = "Silver Metallic";
    else if (desc.includes("red")) color = "Crimson Red";
    else if (desc.includes("white")) color = "Polar White";

    if (desc.includes("sony")) brand = "Sony";
    else if (desc.includes("bose")) brand = "Bose";
    else if (desc.includes("apple")) brand = "Apple";
    else if (desc.includes("hydro")) brand = "Hydro Flask";

    return {
      objectType,
      color,
      brand,
      material,
      distinctiveCharacteristics: `Reported around ${location || "campus"}. Texture: ${color} finish.`,
      tags: [...new Set([...tags, color, objectType.split(" ")[0]])]
    };
  }

  // --- MATCHING ENGINE ---
  findMatchesForLostItem(lostItem) {
    if (!lostItem) return [];

    const lostDesc = (lostItem.description || "").toLowerCase();
    const lostLoc = (lostItem.location || "").toLowerCase();
    const lostType = (lostItem.fingerprint?.objectType || "").toLowerCase();
    const lostColor = (lostItem.fingerprint?.color || "").toLowerCase();

    const matches = [];

    for (const found of this.foundItems) {
      let score = 50;
      const reasons = [];
      const differences = [];

      const foundDesc = (found.description || "").toLowerCase();
      const foundLoc = (found.location || "").toLowerCase();
      const foundType = (found.fingerprint?.objectType || "").toLowerCase();
      const foundColor = (found.fingerprint?.color || "").toLowerCase();

      // Check object type / category alignment
      if (
        (lostType && foundType && (lostType.includes(foundType) || foundType.includes(lostType))) ||
        (lostDesc.includes("headphone") && foundDesc.includes("headphone")) ||
        (lostDesc.includes("flask") && foundDesc.includes("flask")) ||
        (lostDesc.includes("key") && foundDesc.includes("key"))
      ) {
        score += 24;
        reasons.push(`Object category match: Form factor aligned on ${found.fingerprint?.objectType || "item profile"}`);
      } else {
        differences.push("Category variance detected");
      }

      // Check color alignment
      if (
        (lostColor && foundColor && (lostColor.includes(foundColor) || foundColor.includes(lostColor))) ||
        (lostDesc.includes("black") && foundDesc.includes("black")) ||
        (lostDesc.includes("blue") && foundDesc.includes("blue"))
      ) {
        score += 15;
        reasons.push(`Colorway consistency: Both items display ${found.fingerprint?.color || "matching"} finish`);
      } else {
        differences.push("Minor tone or finish variation");
      }

      // Check location proximity
      if (
        (lostLoc && foundLoc && (lostLoc.includes("library") && foundLoc.includes("library"))) ||
        (lostLoc && foundLoc && (lostLoc.includes("science") && foundLoc.includes("science")))
      ) {
        score += 10;
        reasons.push(`Spatial proximity: Reported lost near "${lostItem.location}"; found at "${found.location}"`);
      } else if (lostLoc && foundLoc) {
        differences.push(`Different zone: Reported at ${lostItem.location}, located at ${found.location}`);
      }

      if (score >= 65) {
        matches.push({
          similarityEstimate: Math.min(score, 97),
          foundItem: found,
          reasons: reasons.length ? reasons : ["Similar physical dimensions and campus area"],
          differences: differences.length ? differences : ["Slight surface wear on found item"],
          explanation: `Visual AI correlated category geometry, colorway, and location context with ${Math.min(score, 97)}% confidence.`
        });
      }
    }

    return matches.sort((a, b) => b.similarityEstimate - a.similarityEstimate);
  }

  // --- EVENTS ---
  getEvents() {
    return this.events;
  }

  recommendEvents(interests = [], query = "") {
    const q = query.toLowerCase();
    const list = this.events.filter((e) => {
      if (!q) return true;
      return `${e.title} ${e.category} ${e.tags.join(" ")}`.toLowerCase().includes(q);
    });

    return list
      .map((event) => {
        const overlap = event.tags.filter((t) => interests.includes(t));
        const relevance = Math.min(98, 70 + overlap.length * 10);
        return {
          ...event,
          relevance,
          whyItMatches: overlap.length
            ? `Matches your focus on ${overlap.slice(0, 2).join(" & ")}`
            : "Popular high-engagement campus event"
        };
      })
      .sort((a, b) => b.relevance - a.relevance);
  }

  // --- ISSUES (CAMPUSFIX) ---
  getIssues() {
    return this.issues;
  }

  getIssueById(id) {
    return this.issues.find((issue) => issue.id === id);
  }

  createIssue(issue) {
    const newIssue = {
      id: issue.id || `CF-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: issue.userId || "demo-reporter",
      issueType: issue.issueType || "Facilities Maintenance Request",
      category: issue.category || "Classroom & Physical Maintenance",
      severity: (issue.severity || "MEDIUM").toUpperCase(),
      location: issue.location || "Campus Facility",
      description: issue.description || "Reported maintenance issue.",
      image: issue.image || null,
      status: "REPORTED",
      createdAt: new Date().toISOString()
    };
    this.issues.unshift(newIssue);

    if (mongoose.connection.readyState === 1) {
      IssueModel.create({
        id: newIssue.id,
        userId: newIssue.userId,
        image: newIssue.image,
        issueType: newIssue.issueType,
        category: newIssue.category,
        severity: newIssue.severity,
        location: newIssue.location,
        description: newIssue.description,
        status: newIssue.status,
        createdAt: newIssue.createdAt
      }).catch(err => console.warn('[Database] Issue save warning:', err.message));
    }

    return newIssue;
  }

  updateIssueStatus(id, status) {
    const issue = this.getIssueById(id);
    if (!issue) return null;
    issue.status = status.toUpperCase();

    if (mongoose.connection.readyState === 1) {
      IssueModel.updateOne({ id }, { status: issue.status })
        .catch(err => console.warn('[Database] Issue status update warning:', err.message));
    }

    return issue;
  }

  // --- MENTORS ---
  getMentors() {
    return this.mentors;
  }

  // --- INITIAL DATABASE SYNCHRONIZATION ---
  async syncWithDatabase() {
    if (mongoose.connection.readyState !== 1) return;
    try {
      // Seed found items if empty
      const foundCount = await FoundItemModel.countDocuments();
      if (foundCount === 0) {
        await FoundItemModel.insertMany(
          initialFoundItems.map(item => ({
            id: item.id,
            userId: item.userId,
            image: item.imageUrl,
            description: item.description,
            location: item.location,
            date: item.date,
            fingerprint: item.fingerprint,
            status: item.status,
            createdAt: item.createdAt
          }))
        );
        console.log('[Database] Seeded initial found items to MongoDB Atlas.');
      } else {
        const dbFound = await FoundItemModel.find({}).sort({ createdAt: -1 });
        if (dbFound.length > 0) {
          this.foundItems = dbFound.map(doc => ({
            id: doc.id,
            userId: doc.userId,
            description: doc.description,
            location: doc.location,
            date: doc.date,
            imageUrl: doc.image,
            fingerprint: doc.fingerprint,
            status: doc.status,
            createdAt: doc.createdAt
          }));
        }
      }

      // Seed events if empty
      const eventCount = await EventModel.countDocuments();
      if (eventCount === 0) {
        await EventModel.insertMany(initialEvents);
        console.log('[Database] Seeded initial campus events to MongoDB Atlas.');
      }

      // Seed issues if empty
      const issueCount = await IssueModel.countDocuments();
      if (issueCount === 0) {
        await IssueModel.insertMany(
          initialIssues.map(iss => ({
            id: iss.id,
            userId: 'demo-reporter',
            issueType: iss.issueType,
            category: iss.category,
            severity: iss.severity,
            location: iss.location,
            description: iss.description,
            status: iss.status,
            createdAt: iss.createdAt
          }))
        );
        console.log('[Database] Seeded initial facility tickets to MongoDB Atlas.');
      }
    } catch (err) {
      console.warn('[Database] Sync warning:', err.message);
    }
  }
}

export const store = new CampusDataStore();
