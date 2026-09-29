import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

let client = null;

function getClient() {
  if (!client && process.env.GEMINI_API_KEY) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return client;
}

function cleanJsonText(raw) {
  if (!raw) return null;
  let text = raw.trim();
  if (text.startsWith('```json')) {
    text = text.slice(7);
  } else if (text.startsWith('```')) {
    text = text.slice(3);
  }
  if (text.endsWith('```')) {
    text = text.slice(0, -3);
  }
  return text.trim();
}

/**
 * Service 1: Intent Detection & Semantic Routing
 */
export async function classifyIntentWithGemini(message) {
  const ai = getClient();
  if (!ai) return null;

  try {
    const prompt = `You are CampusLens AI, an intelligent campus routing and assistance engine.
Classify this student request into one of these intents:
- LOST_ITEM (student lost or misplaced something)
- FOUND_ITEM (student found someone's item on campus)
- EVENT_DISCOVERY (student asking about hackathons, workshops, clubs, events)
- FACILITY_ISSUE (student reporting broken fan, water leak, light, facility issue)
- MENTOR_SEARCH (student seeking academic doubt solving or mentor)
- GENERAL_CAMPUS_QUERY (general question about campus, timings, study rooms)

Student message: "${message}"

Respond strictly with valid JSON with fields:
{
  "intent": "LOST_ITEM" | "FOUND_ITEM" | "EVENT_DISCOVERY" | "FACILITY_ISSUE" | "MENTOR_SEARCH" | "GENERAL_CAMPUS_QUERY",
  "confidence": 0.95,
  "route": "/lostlens" | "/events" | "/campusfix" | "/educonnect" | "/ai",
  "reasoning": "brief 1-sentence reason",
  "entities": {
    "item": "string or null",
    "location": "string or null",
    "topic": "string or null"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt
    });

    const cleaned = cleanJsonText(response.text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.warn('[Gemini] classifyIntent error, falling back:', error.message);
    return null;
  }
}

/**
 * Service 2: LostLens Visual Fingerprint Extraction
 */
export async function extractVisualFingerprintWithGemini({ imageBase64, mimeType = 'image/jpeg', description = '', location = '' }) {
  const ai = getClient();
  if (!ai) return null;

  try {
    const parts = [];
    const promptText = `You are CampusLens LostLens Visual AI.
Analyze this campus item report.
Description: "${description}"
Location: "${location}"

Extract a structured visual fingerprint JSON object:
{
  "objectType": "concise item category (e.g. Wireless Over-Ear Headphones, Insulated Water Bottle, Keychain)",
  "color": "dominant colors and finish (e.g. Matte Black, Navy Blue)",
  "brand": "detected brand or style (e.g. Sony, Hydro Flask, Unbranded)",
  "material": "e.g. Polycarbonate + Acoustic Foam, Stainless Steel",
  "distinctiveCharacteristics": "notable visual details, stickers, scratches, hinge pins",
  "tags": ["Array", "Of", "Keywords"]
}
Respond strictly with valid JSON.`;

    parts.push({ text: promptText });

    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: [{ role: 'user', parts }]
    });

    const cleaned = cleanJsonText(response.text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.warn('[Gemini] extractFingerprint error, falling back:', error.message);
    return null;
  }
}

/**
 * Service 3: Visual Candidate Comparison & Reasoning
 */
export async function compareItemsWithGemini({ lostItem, foundItem }) {
  const ai = getClient();
  if (!ai) return null;

  try {
    const prompt = `Compare these two campus lost & found items and evaluate if they are the same physical item:
Item 1 (Lost):
- Description: ${lostItem.description}
- Location: ${lostItem.location}
- Fingerprint: ${JSON.stringify(lostItem.fingerprint || {})}

Item 2 (Found):
- Description: ${foundItem.description}
- Location: ${foundItem.location}
- Fingerprint: ${JSON.stringify(foundItem.fingerprint || {})}

Respond strictly with valid JSON:
{
  "similarityEstimate": 85,
  "reasons": ["matching reason 1", "matching reason 2"],
  "differences": ["notable differences or wear"],
  "explanation": "concise 1-sentence multimodal reasoning"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt
    });

    const cleaned = cleanJsonText(response.text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.warn('[Gemini] compareItems error, falling back:', error.message);
    return null;
  }
}

/**
 * Service 4: CampusFix Multimodal Facility Triage
 */
export async function triageFacilityIssueWithGemini({ imageBase64, mimeType = 'image/jpeg', note = '', location = '' }) {
  const ai = getClient();
  if (!ai) return null;

  try {
    const parts = [];
    const promptText = `You are CampusFix AI, an automated university facilities triage inspector.
Evaluate this campus maintenance report.
Note: "${note}"
Location: "${location}"

Analyze the damage or hazard and classify the issue.
Respond strictly with valid JSON:
{
  "issueType": "e.g. Ceiling Fan Wobble & Loose Blade / Water Leak / Flickering Light",
  "category": "e.g. Electrical & Mechanical Maintenance / Plumbing / Carpentry",
  "severity": "HIGH" | "MEDIUM" | "LOW",
  "description": "concise technical inspection summary and safety assessment",
  "suggestedDepartment": "e.g. Facilities Engineering / Campus Electrical / Plumbing Services",
  "location": "${location || 'Campus Facility'}"
}`;

    parts.push({ text: promptText });

    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: [{ role: 'user', parts }]
    });

    const cleaned = cleanJsonText(response.text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.warn('[Gemini] triageFacilityIssue error, falling back:', error.message);
    return null;
  }
}
