export const initialEvents = [
  {
    id: "evt-1",
    title: "AI Builders Workshop",
    category: "Technology",
    tags: ["AI", "Coding", "Career"],
    time: "10:00 AM",
    location: "Seminar Hall",
    date: "Today",
    accent: "cyan",
    description: "Build practical AI features with modern developer tools and multimodal APIs.",
    organizer: "Tech Club"
  },
  {
    id: "evt-2",
    title: "Startup Founders Meetup",
    category: "Startups",
    tags: ["Startups", "Networking", "Entrepreneurship"],
    time: "1:00 PM",
    location: "Innovation Center",
    date: "Today",
    accent: "violet",
    description: "Meet student founders, builders and campus entrepreneurs working on real ventures.",
    organizer: "E-Cell"
  },
  {
    id: "evt-3",
    title: "Tech Club Orientation",
    category: "Clubs",
    tags: ["Technology", "Networking", "Coding"],
    time: "4:00 PM",
    location: "Auditorium",
    date: "Today",
    accent: "blue",
    description: "Discover project teams, technical communities and upcoming hackathon challenges.",
    organizer: "Tech Club"
  },
  {
    id: "evt-4",
    title: "Design Jam",
    category: "Design",
    tags: ["Design", "UI/UX", "Creativity"],
    time: "5:30 PM",
    location: "Design Studio",
    date: "Tomorrow",
    accent: "pink",
    description: "A fast-paced collaborative interface and UX design sprint challenge.",
    organizer: "Design Society"
  },
  {
    id: "evt-5",
    title: "Campus Football League",
    category: "Sports",
    tags: ["Sports", "Teams", "Fitness"],
    time: "6:00 PM",
    location: "Main Ground",
    date: "Tomorrow",
    accent: "green",
    description: "Inter-department football fixtures and open team trials under floodlights.",
    organizer: "Sports Council"
  },
  {
    id: "evt-6",
    title: "Photography Walk",
    category: "Cultural",
    tags: ["Photography", "Art", "Community"],
    time: "7:00 AM",
    location: "North Gate",
    date: "Sat, 27 Sep",
    accent: "orange",
    description: "Explore campus through street, architecture and portrait photography techniques.",
    organizer: "Photo Club"
  }
];

export const initialFoundItems = [
  {
    id: "FND-1049",
    userId: "demo-finder",
    description: "Black wireless over-ear headphones with silver pivot accents",
    location: "Library 2nd Floor (Quiet Study Room A)",
    date: "Yesterday · 4:30 PM",
    status: "active",
    imageUrl: null,
    fingerprint: {
      objectType: "Wireless Over-Ear Headphones",
      color: "Matte Black",
      brand: "Sony / Generic Premium Style",
      material: "Polycarbonate + Acoustic Foam",
      distinctiveCharacteristics: "Silver pivot hinge pins, oval earcups, micro-scuff on left outer band",
      tags: ["Headphones", "Audio", "Matte Black", "Electronics"]
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "FND-1050",
    userId: "demo-finder",
    description: "Navy blue insulated hydro flask with sticker on side",
    location: "Science Block Lab 3",
    date: "Today · 9:15 AM",
    status: "active",
    imageUrl: null,
    fingerprint: {
      objectType: "Insulated Water Bottle",
      color: "Navy Blue",
      brand: "Hydro Flask",
      material: "Stainless Steel with Powder Coat",
      distinctiveCharacteristics: "Flex cap with carry loop, subtle coding sticker near base",
      tags: ["Bottle", "Hydro Flask", "Navy Blue", "Lifestyle"]
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "FND-1051",
    userId: "demo-finder",
    description: "Silver keychain with Room 302 tag and bike key",
    location: "Cafeteria Outdoor Lawn",
    date: "Today · 11:00 AM",
    status: "active",
    imageUrl: null,
    fingerprint: {
      objectType: "Keys and Keychain",
      color: "Silver / Metallic",
      brand: "Unbranded",
      material: "Metal & Acrylic Tag",
      distinctiveCharacteristics: "Acrylic tag labelled '302', two brass keys, one black rubber bike key",
      tags: ["Keys", "Keychain", "Metal", "Personal"]
    },
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  }
];

export const initialIssues = [
  {
    id: "CF-2048",
    userId: "demo-reporter",
    issueType: "Ceiling Fan Wobble & Loose Blade",
    category: "Electrical & Classroom Maintenance",
    severity: "HIGH",
    location: "Science Block · Room B-204",
    description: "Ceiling fan shows visible blade imbalance and mounting hardware slack, posing a potential hazard and disturbing lectures.",
    status: "IN PROGRESS",
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: "CF-2047",
    userId: "demo-reporter",
    issueType: "Water leakage",
    category: "Plumbing",
    severity: "HIGH",
    location: "Block B · Washroom 2",
    description: "Main pipe under sink has active drip causing pooled water on floor tiles.",
    status: "ACKNOWLEDGED",
    createdAt: new Date(Date.now() - 34 * 60 * 1000).toISOString()
  },
  {
    id: "CF-2046",
    userId: "demo-reporter",
    issueType: "Damaged study chair",
    category: "Furniture",
    severity: "LOW",
    location: "Library · Floor 1",
    description: "Right armrest is cracked and loose.",
    status: "REPORTED",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: "CF-2045",
    userId: "demo-reporter",
    issueType: "Flickering tube light",
    category: "Electrical",
    severity: "MEDIUM",
    location: "Main Hall · H-12",
    description: "Fluorescent tube is strobe-flickering and making humming sound.",
    status: "RESOLVED",
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  }
];

export const initialMentors = [
  {
    id: "m-1",
    name: "Riya Sharma",
    role: "Frontend & React Mentor",
    skills: ["React", "JavaScript", "UI/UX", "Tailwind"],
    status: "Available now",
    response: "< 3 min",
    score: 96
  },
  {
    id: "m-2",
    name: "Arjun Mehta",
    role: "Python & AI Mentor",
    skills: ["Python", "AI", "ML", "Gemini API"],
    status: "Available today",
    response: "< 8 min",
    score: 91
  },
  {
    id: "m-3",
    name: "Nisha Kapoor",
    role: "Product Design Mentor",
    skills: ["Figma", "UX Research", "Design Systems"],
    status: "Available now",
    response: "< 5 min",
    score: 89
  }
];
