const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

export async function detectIntent(message) {
  const response = await fetch(`${API_BASE_URL}/ai/intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || "CampusLens AI request failed.");
    error.status = response.status;
    error.code = payload.code;
    throw error;
  }

  return payload;
}

export async function createLostItem({
  description,
  location,
  imageBase64,
  mimeType,
  userId
}) {
  const response = await fetch(`${API_BASE_URL}/lostlens/lost`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      description,
      location,
      imageBase64,
      mimeType,
      userId
    })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      payload.message || "Could not analyze lost item."
    );

    error.status = response.status;
    error.code = payload.code;

    throw error;
  }

  return payload;
}


export async function createFoundItem({
  description,
  location,
  imageBase64,
  mimeType,
  userId
}) {
  const response = await fetch(`${API_BASE_URL}/lostlens/found`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      description,
      location,
      imageBase64,
      mimeType,
      userId
    })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      payload.message || "Could not analyze found item."
    );

    error.status = response.status;
    error.code = payload.code;

    throw error;
  }

  return payload;
}

export async function findPotentialMatches(lostItemId) {
  const response = await fetch(`${API_BASE_URL}/lostlens/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      lostItemId
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data?.message || "Could not find potential matches."
    );

    error.code = data?.code;
    error.status = response.status;

    throw error;
  }

  return data;
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Could not read image."));
        return;
      }

      // Remove:
      // data:image/jpeg;base64,
      // leaving only the Base64 data.
      const base64 = result.split(",")[1];

      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("Could not read image."));
    };

    reader.readAsDataURL(file);
  });
}

export { API_BASE_URL };