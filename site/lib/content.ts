// All copy and facts are Bates's own (see ../recon). Shortened lines are marked in NOTES.md.

export const PHONE = "(484) 443-8772";
export const PHONE_HREF = "tel:+14844438772";
export const EMAIL = "info@bateslandscaping.net";
export const ADDRESS = ["705 St Marys St", "Phoenixville, PA 19460"];

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/BatesLandscapingPa", icon: "FacebookLogo" },
  { label: "Instagram", href: "https://www.instagram.com/bateslandscapingltd", icon: "InstagramLogo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bates-landscaping-ltd", icon: "LinkedinLogo" },
] as const;

// Paths mirror the live site (bateslandscaping.co menu, checked 2026-09-25) so a real launch keeps their URLs.
export const NAV = {
  services: {
    Commercial: [
      ["Installation & Design", "/commercial-landscaping-installation-design"],
      ["Maintenance", "/commercial-maintenance"],
      ["Drainage Solutions", "/commercial-drainage"],
      ["Bamboo Remediation", "/bamboo-remediation"],
      ["Snow + Ice", "/snow-ice-removal-west-chester"],
    ],
    Residential: [
      ["Installation & Design", "/design"],
      ["Estate Maintenance", "/maintain"],
      ["Drainage Solutions", "/drainage-solutions"],
      ["Bamboo Remediation", "/bamboo-remediation"],
    ],
  },
  portfolio: [
    ["Project Gallery", "/project-gallery"],
    ["Case Studies", "/case-studies"],
  ],
  careers: [
    ["Join Our Team", "/join-our-team"],
    ["Trainual Login", "https://bates-landscaping.trainualapp.com/users/sign_in"],
  ],
} as const;

// Small cards at staggered heights, Hooper-sized. h = card height in px on desktop.
export const GALLERY = [
  { src: "/img/g-patio-wc.webp", caption: "Patios, West Chester", w: 260, h: 340, y: 0 },
  { src: "/img/g-stormwater-dt.webp", caption: "Stormwater, Downingtown", w: 330, h: 240, y: 90 },
  { src: "/img/g-senior.webp", caption: "Senior living, Wayne", w: 230, h: 300, y: 30 },
  { src: "/img/g-steps.webp", caption: "Stone steps", w: 300, h: 220, y: 120 },
  { src: "/img/g-office-exton.webp", caption: "Commercial design, Exton", w: 320, h: 250, y: 10 },
  { src: "/img/g-column-wc.webp", caption: "Hardscaping, West Chester", w: 230, h: 310, y: 100 },
  { src: "/img/g-glenmills.webp", caption: "Stormwater, Glen Mills", w: 330, h: 240, y: 40 },
  { src: "/img/g-native.webp", caption: "Native planting", w: 260, h: 330, y: 110 },
  { src: "/img/g-kop.webp", caption: "Lawn care, King of Prussia", w: 310, h: 230, y: 0 },
  { src: "/img/g-wall.webp", caption: "Retaining wall", w: 280, h: 220, y: 120 },
  { src: "/img/g-senior-entry.webp", caption: "Senior living entrance", w: 240, h: 310, y: 20 },
  { src: "/img/g-hardscape-wc.webp", caption: "Commercial hardscaping", w: 300, h: 240, y: 90 },
  { src: "/img/g-townhomes.webp", caption: "Townhome community", w: 320, h: 240, y: 10 },
  { src: "/img/g-wayne.webp", caption: "Commercial, Wayne", w: 240, h: 320, y: 100 },
] as const;

// 8 of the 16 case studies: the ones whose photo clearly shows that job (recon/case-studies.json).
export const CASES = [
  {
    title: "Bamboo Removal",
    tags: ["Residential", "Bamboo Remediation", "Delaware County"],
    price: "$20,000-$25,000",
    line: "The bamboo was mainly on their property and was planted by the previous homeowner.",
    img: "/img/c-bamboo.webp",
  },
  {
    title: "Storm Water Drainage with Berms and Piping",
    tags: ["Drainage", "Delaware County"],
    price: "$16,000-$24,000",
    line: "A property in a valley that received 41 inches of water in the lower floor during a hurricane.",
    img: "/img/c-berms.webp",
  },
  {
    title: "Entry Walkway with Porch Overlay",
    tags: ["Residential", "Hardscaping", "Chester County"],
    price: "$28K-$33K",
    line: "The customer lived in the house for over 20 years and the front walkway and porch needed an upgrade.",
    img: "/img/c-walkway.webp",
  },
  {
    title: "Custom Pondless Water Feature",
    tags: ["Residential", "Installation & Design", "Chester County"],
    price: "$20,000-$24,000",
    line: "The kids were too old for the play-set, so the homeowners upgraded to something the parents could enjoy.",
    img: "/img/c-pondless.webp",
  },
  {
    title: "Irregular Natural Flagstone Re-Installation",
    tags: ["Commercial", "Hardscaping", "Delaware County"],
    price: "$22,000-$28,000",
    line: "An event venue had safety concerns on the patio their guests use for weddings.",
    img: "/img/c-flagstone.webp",
  },
  {
    title: "Native Planting with Added Water Feature",
    tags: ["Residential", "Installation & Design", "Montgomery County"],
    price: "$8,000-$13,000",
    line: "The client had acreage they wanted to convert from turf to a native, wildlife garden.",
    img: "/img/g-native.webp",
  },
  {
    title: "Business Complex Office Building Maintenance",
    tags: ["Commercial", "Maintenance", "Chester County"],
    price: null,
    line: "One of the largest industrial real estate firms in the northeast relies on Bates to maintain a large portion of their portfolio.",
    img: "/img/c-office.webp",
  },
  {
    title: "55+ Community Maintenance and Snow + Ice",
    tags: ["HOA", "Maintenance", "Snow + Ice", "Delaware County"],
    price: null,
    line: "An association brought Bates on to improve their landscape and snow removal after years with another vendor.",
    img: "/img/c-55plus.webp",
  },
] as const;

// Chat quick replies. Answers are condensed from Bates's own FAQs and case studies.
export const CHIPS = [
  {
    key: "drainage",
    label: "Drainage",
    answer:
      "Water problems are one of our specialties. We assess where the water is going, then fix it with grading, French drains, catch basins, rain gardens, bioswales or retention systems.",
  },
  {
    key: "bamboo",
    label: "Bamboo",
    answer:
      "We remove bamboo for homeowners and communities across Chester and Delaware Counties, from a neighbour's clump creeping into your lawn to a full property clear-out.",
  },
  {
    key: "hardscaping",
    label: "Patio / garden",
    answer:
      "We design and build patios, walkways, retaining walls, fire pits, outdoor kitchens, water features and planting. A patio or walkway usually takes a few days; bigger builds take weeks.",
  },
  {
    key: "maintenance",
    label: "Maintenance",
    answer:
      "Year-round plans: mowing, pruning, mulching, fertilization, weed control, irrigation and seasonal clean-ups. For homes, that's our Estate Maintenance service.",
  },
  {
    key: "snow",
    label: "Snow",
    answer:
      "Snow + ice is for commercial properties and HOAs (we don't plow for individual homeowners). Contracts or on-demand, and we're available 24/7 during storms.",
  },
  {
    key: "other",
    label: "Something else",
    answer: `Tell us about your property. Call ${PHONE}, email ${EMAIL}, or book a consultation and we'll take a look.`,
  },
] as const;
