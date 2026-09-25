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

// The five service cards from their homepage. Their homepage blurbs are swapped between cards, so each line here is
// taken from that service's own page (recon/services/).
export const SERVICES = [
  {
    title: "Installation & Design",
    line: "Our dedicated team works with your company to create a breathtaking outdoor display that accentuates the beauty of your property.",
    href: "/commercial-landscaping-installation-design",
    img: "/img/c-pondless.webp",
  },
  {
    title: "Maintenance",
    line: "With routine maintenance, you can ensure your outdoor spaces reflect the professionalism of your company.",
    href: "/commercial-maintenance",
    img: "/img/g-kop.webp",
  },
  {
    title: "Drainage Solutions",
    line: "Our drainage experts design a cost-effective drainage system that protects your landscape and facilities against flooding.",
    href: "/commercial-drainage",
    img: "/img/c-berms.webp",
  },
  {
    title: "Bamboo Remediation",
    line: "To permanently get rid of bamboo, you must remove the rhizomes. We have the knowledge and experience to help you do just that.",
    href: "/bamboo-remediation",
    img: "/img/c-bamboo.webp",
  },
  {
    title: "Snow + Ice",
    line: "Our Commercial Snow Removal division is a trusted and insured group of highly skilled and trained professionals.",
    note: "Commercial and HOA properties",
    href: "/snow-ice-removal-west-chester",
    img: "/img/s-snow.webp",
  },
] as const;

// Milestones from their About page (verified in the planning session, see HANDOFF.md §5).
export const HISTORY = [
  ["2002", "Justin Bates learns the trade from his father"],
  ["2009", "Bates Landscaping starts in his mother's garage"],
  ["2011", "Incorporated"],
  ["2017", "West Chester office opens"],
  ["2018", "Drainage team formed"],
  ["2022", "Phoenixville location opens"],
] as const;

// Team, verbatim from recon/team.json (card titles as on their site). Ordered by role, not by their page's order
// (which put Justin, the founder, fourth): partners, managers, business/office, supervisors, assistant; ties by tenure.
export const TEAM = [
  {
    name: "Justin",
    role: "Partner + General Manager est 2009",
    img: "/img/team/justin.webp",
    bio: "As the company’s founder and general manager, Justin has been instrumental in the role of developing culture, values, goals, and a great work atmosphere. Justin believes in the American Dream and the vision of providing a long-term home for all of the employees. The company’s vision and goals are a part of Justin’s daily operation role, while still playing an active role in managing team members.\n\nJustin’s hobbies include; working, going to work, and thinking about work.",
  },
  {
    name: "Dylan",
    role: "Partner + VP of Operations est 2013",
    img: "/img/team/dylan.webp",
    bio: "“I really enjoy being in the field with my guys. I like visiting them on site at properties and helping them along with training, while encouraging them to work smarter, not harder.” As a key member of the team, Dylan oversees all landscape, drainage, maintenance, and snow removal operations here at the company.\n\nDylan started in the trenches, as an active and engaged laborer eager to learn more and more. Having worked previously in the automotive field fixing motors, Dylan has always been very dependable when it comes to fixing equipment if it goes down on site. His tremendous work ethic has moved him along from skilled laborer, to experienced supervisor, and as most of the team calls him ‘Jefe’ (meaning Boss in Spanish).",
  },
  {
    name: "Megan",
    role: "Area Manager est 2015",
    img: "/img/team/megan.webp",
    bio: "A cornerstone of the Bates Landscaping team. Megan has been with Bates Landscaping since October 2015, beginning her journey by managing billing for Bates Team’s lawn care clients. Her role quickly expanded as she became a key figure in the company’s administrative operations. Over the years, she has successfully overseen scheduling, accounting, and human resources, ensuring day-to-day operations remain organized and efficient.\n\nIn August 2024, Megan transitioned into the role of Account Manager, applying her exceptional communication skills and comprehensive knowledge of the company to serve clients directly. She is dedicated to ensuring that each project is executed smoothly, client relationships are strengthened, and every landscape is a true reflection of the excellence and pride that define Bates Landscaping.\n\nMegan is a proud mother of two girls and a loving wife. Outside of Bates Landscaping, Megan enjoys spending time with her family and visiting new places!",
  },
  {
    name: "Molly",
    role: "Production Manager est 2024",
    img: "/img/team/molly.webp",
    bio: "Molly is a professional in the landscaping field. She studied landscaping at Penn State and expanded her knowledge and experience with a semester abroad in New Zealand, where she immersed herself in a new culture and the natural beauty of the region. Currently, she works as a production manager at Bates Landscaping, where she handles client requests, manages inventory, and follow-ups on projects.\n\nMolly is passionate about sports, having grown up playing three different ones. She spends her weekends off watching Philadelphia sports teams and hopes her future kids’ first words will be “go birds.” Her long-term dream is to build a log cabin, providing a serene and comfortable place for her family to grow and relax.",
  },
  {
    name: "Cailee",
    role: "Office Manager",
    img: "/img/team/cailee.webp",
    bio: "How many Bates’s is too many? When it comes to Cailee, we wish we had 100! As the Office Manager at Bates, Cailee is an essential part of our team. She excels in brainstorming, creating, executing, and training new processes, systems, and programs across various departments, including HR, Sales, and Marketing. Cailee’s expertise ensures everything runs efficiently and effectively, elevating our operations to new heights.\n\nWhen she’s not working, Cailee enjoys hiking, cooking, running, and reading. She also loves spending quality time with her family and friends, making the most of every moment together.",
  },
  {
    name: "Melissa",
    role: "Business Developer est 2014",
    img: "/img/team/melissa.webp",
    bio: "Melissa designs outdoor living spaces for her clients, a privilege she is honored to make a full-time career. Growing up near the city, without any green space, Melissa focuses on expanding any outdoor space through creative thinking and using ‘the right plant for the right place”. Melissa holds her Bachelor of Science degree in Landscape Design/Construction from Penn State University (WE ARE ..) and is an International Society of Arboriculture Certified Arborist.\n\nHer hobbies include; brunching with her mom, hiking, spending too much money at Target, cooking while drinking wine, and of course, spending time with her growing family!",
  },
  {
    name: "Khyss",
    role: "Human Resources Administrator est 2024",
    img: "/img/team/khyss.webp",
    bio: "Khyss is the one who’s specializing the hiring process and employee information management of the company. She brings a wealth of organizational skills and a keen eye for detail to her role. With a background in HR administration, Khyss ensures that each step of the hiring process is streamlined and effective.\n\nOutside the office, Khyss is an introvert traveler with a deep love for exploring different places. Khyss finds solace and joy in the beauty of the places she visited. Her adventurous spirit extends beyond the trails as she eagerly seeks out new culinary experiences whether sampling street foods or savoring traditional dishes and desserts. Khyss captures the essence of her travels, sharing her experiences with friends and fellow adventurers. Maybe you have some places to suggest?",
  },
  {
    name: "Enrique",
    role: "Supervisor est 2011",
    img: "/img/team/enrique.webp",
    bio: "How many companies can say they still have their very first employee? Well we can, and we take pride in that. Enrique has been with Bates Landscaping since the very beginning.\n\nHe is a very honest, loyal and dedicated team member. Whether he is walking a jobsite or operating a machine, Enrique is always smiling. He definitely set the bar high when it came to hiring new employees.\n\nOutside of work, Enrique enjoys being able to relax and listen to music with his friends and family. Although he may seem like a rough and tough guy, Enrique is one of the most genuine and caring people on our team and we are lucky to have him!",
  },
  {
    name: "Angel",
    role: "Shop Supervisor est 2018",
    img: "/img/team/angel.webp",
    bio: "Sometimes things just fall into place, or in Angel’s case, walks into the Bates Landscaping office. As the company’s shop supervisor and mechanic, Angel works with all our field equipment, trucks, and vechinal upfitting in the shop. He comes to Bates Landscaping with over 35+ years of mechanical expertise and can fix just about anything.\n\nNot only is Angel a wiz when it comes to fixing things, but he is by far the nicest person you’ll ever meet. He always goes above and beyond for the team, and nothing makes him happier than a nice, hot black coffee.",
  },
  {
    name: "Juliana",
    role: "Sales Assistant est 2025",
    img: "/img/team/juliana.webp",
    bio: "Juliana supports the Bates Landscaping sales team by managing inquiries, coordinating client communications, and ensuring a smooth experience from first contact to project handoff. With strong attention to detail and a customer-first mindset, she helps keep projects organized, timelines on track, and clients well-informed every step of the way.",
  },
] as const;

// Six of their homepage FAQs, verbatim (en dash in #6 replaced with a comma). The full list is recon/faq.md.
export const FAQS = [
  ["How far out are you scheduled?", "It depends on the service, but most projects are scheduled within 3-4 weeks after approval."],
  ["Do you service my area?", "If you live in Delaware, Chester, or Montgomery Counties, yes, most likely. Fill out our submission form and our office will reach out."],
  ["How does your pricing work?", "Pricing is based off the duration of your project and the amount of material we would use to complete it. Visit our contact us page and we will help get you an estimate!"],
  ["What payment options are available?", "We accept check, cash, all major credit cards, and we offer financing!"],
  ["Can you plow my driveway?", "If you are in an HOA or are a commercial-type client, yes. However, we do not service individual homeowners for snow plowing."],
  ["Do you do tree work?", "We can help with small tree pruning, think below 15 foot, like a Dogwood tree. Anything larger than that, we could recommend another professional that could help!"],
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
