export const SITE = {
  name: "UMMAKJ Architecture Studio",
  short: "UMMAKJ",
  tagline: "Architecture. Interiors. Landscape.",
  email: "atelier@ummakj.com",
  phone: "+1 (212) 555-0134",
  address: "12 Savile Row, Mayfair, London W1S 3PQ",
  coords: "51.5112, -0.1399",
  founded: 2009,
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
    { label: "Pinterest", href: "#" }
  ]
};

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  heroVilla: u("photo-1600596542815-ffad4c1539a9", 2400),
  heroVillaAlt: u("photo-1600585154340-be6161a56a0c", 2400),
  office: u("photo-1497366216548-37526070297c", 2000),
  founder: u("photo-1560250097-0b93528c311a", 1400),
  studio: u("photo-1487958449943-2429e8be8625", 2000),
  detail: u("photo-1600607687939-ce8a6c25118c", 2000)
};

export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  area: string;
  type: string;
  image: string;
  imageAlt: string;
  tall?: boolean;
  description: string;
};

export const PROJECTS: Project[] = [
  {
    id: "the-vault-house",
    title: "The Vault House",
    location: "Marbella, Spain",
    year: "2025",
    area: "1,420 m²",
    type: "Private Residence",
    image: u("photo-1613490493576-7fde63acd811", 1600),
    imageAlt: "Modern minimalist villa with evening lighting",
    tall: true,
    description:
      "A subterranean dwelling carved into a coastal escarpment. Cast concrete vaults frame the horizon, while a courtyard light-well anchors the plan to the earth."
  },
  {
    id: "casa-umbria",
    title: "Casa Umbria",
    location: "Umbria, Italy",
    year: "2024",
    area: "980 m²",
    type: "Country Estate",
    image: u("photo-1512917774080-9991f1c4c750", 1600),
    imageAlt: "Stone and glass country estate among olive trees",
    description:
      "Local stone, deep eaves and a floating glass pavilion. The house reinterprets the vernacular farmstead for a modern family in the Tuscan hills."
  },
  {
    id: "obsidian-pavilion",
    title: "Obsidian Pavilion",
    location: "Kyoto, Japan",
    year: "2024",
    area: "640 m²",
    type: "Cultural Pavilion",
    image: u("photo-1600585154526-990dced4db0d", 1600),
    imageAlt: "Dark minimalist pavilion in a forest",
    tall: true,
    description:
      "A mirror-black volume that dissolves into the forest canopy. Visitors move through a sequence of compressed and released spaces toward a single view."
  },
  {
    id: "serpentine-villa",
    title: "Serpentine Villa",
    location: "Antiparos, Greece",
    year: "2023",
    area: "1,150 m²",
    type: "Seaside Residence",
    image: u("photo-1600566753190-17f0baa2a6c3", 1600),
    imageAlt: "Villa with infinity pool overlooking the sea",
    description:
      "White plaster curves wind along a cliff edge, echoing the coastline. Terraces step down to a saltwater infinity pool suspended above the Aegean."
  },
  {
    id: "monolith-residence",
    title: "Monolith Residence",
    location: "Sedona, USA",
    year: "2023",
    area: "2,100 m²",
    type: "Private Residence",
    image: u("photo-1600047509807-ba8f99d2cdde", 1600),
    imageAlt: "Monolithic concrete residence against red cliffs",
    description:
      "A single travertine monolith split by a deep slot of glass. The desert landscape is choreographed through a series of carefully placed apertures."
  },
  {
    id: "atrium-house",
    title: "Atrium House",
    location: "Singapore",
    year: "2022",
    area: "1,870 m²",
    type: "Urban Residence",
    image: u("photo-1600607687939-ce8a6c25118c", 1600),
    imageAlt: "Interior atrium with tropical greenery and light",
    tall: true,
    description:
      "A vertical garden atrium forms the heart of the home, pulling daylight and rainfall deep into the plan while every room opens onto living foliage."
  },
  {
    id: "skyline-penthouse",
    title: "Skyline Penthouse",
    location: "New York, USA",
    year: "2022",
    area: "720 m²",
    type: "Residence",
    image: u("photo-1600210492486-724fe5c67fb0", 1600),
    imageAlt: "Penthouse interior overlooking the skyline",
    description:
      "Above the city grid, walls dissolve into glass. Material palettes of smoked oak, bronze and honed stone frame uninterrupted views of the skyline."
  },
  {
    id: "cove-residence",
    title: "Cove Residence",
    location: "Amanali, Mexico",
    year: "2021",
    area: "1,340 m²",
    type: "Seaside Residence",
    image: u("photo-1615529182904-14819c35db37", 1600),
    imageAlt: "Contemporary residence built into a cove",
    description:
      "Stone volumes nestle into a protected cove, their roofs becoming terraces. A single deep-shaded loggia mediates between sand, sun and stone."
  }
];

export type Service = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
};

export const SERVICES: Service[] = [
  {
    id: "architecture",
    title: "Architecture",
    blurb: "Houses, towers and cultural landmarks conceived as timeless sculpture.",
    icon: "building"
  },
  {
    id: "interiors",
    title: "Interior Design",
    blurb: "Spatial narratives in stone, timber and bronze — resolved to the millimetre.",
    icon: "sofa"
  },
  {
    id: "landscape",
    title: "Landscape",
    blurb: "Gardens and topography woven into the architecture, not added to it.",
    icon: "tree"
  },
  {
    id: "urban",
    title: "Urban Planning",
    blurb: "Master plans that shape cities around people, light and movement.",
    icon: "city"
  },
  {
    id: "visualization",
    title: "Visualization",
    blurb: "Cinematic imagery that lets you feel a building before it is built.",
    icon: "monitor"
  },
  {
    id: "masterplan",
    title: "Master Planning",
    blurb: "Long-horizon strategies for estates, resorts and cultural districts.",
    icon: "compass"
  }
];

export const TIMELINE = [
  {
    year: "2009",
    title: "The Atelier is Born",
    text: "UMMAKJ opens as a two-person studio above a Mayfair print shop, sketching the first villa by hand."
  },
  {
    year: "2013",
    title: "First International Commission",
    text: "A private residence on the Greek coast — our first project beyond the UK — wins the European Architecture Prize."
  },
  {
    year: "2016",
    title: "Interiors & Landscape Practice",
    text: "The studio expands into interiors and landscape, offering a single hand across the entire estate."
  },
  {
    year: "2020",
    title: "The Craft Lab",
    text: "A dedicated workshop for prototypes, material studies and full-scale mock-ups opens in Somerset."
  },
  {
    year: "2024",
    title: "Studio of the Year",
    text: "Recognised internationally for a body of work spanning five continents and thirty-two countries."
  }
];

export const STATS = [
  { value: 15, suffix: "", label: "Years of Practice" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 38, suffix: "", label: "International Awards" },
  { value: 96, suffix: "+", label: "Private Clients" }
];

export const PROCESS = [
  { id: "blueprint", no: "01", title: "Blueprint Sketch", text: "Every commission begins with a hand-drawn line on paper." },
  { id: "concept", no: "02", title: "Concept", text: "The idea is distilled into a spatial narrative and material language." },
  { id: "planning", no: "03", title: "Planning", text: "Permissions, site strategy and technical feasibility resolved in parallel." },
  { id: "visualization", no: "04", title: "Visualization", text: "Cinematic renders let you inhabit the space before it exists." },
  { id: "construction", no: "05", title: "Construction", text: "Our own craft lab and site teams hold every tolerance to the line." },
  { id: "completion", no: "06", title: "Completion", text: "Handover — and a lifetime relationship with the places we make." }
];

export const TESTIMONIALS = [
  {
    quote:
      "Working with UMMAKJ is not a construction project — it is a work of art executed with surgical precision. Our home feels as if it has always existed on the cliff.",
    author: "Elena & Viktor Marchetti",
    role: "The Vault House, Marbella"
  },
  {
    quote:
      "Every square metre was considered. They do not design houses; they compose silence, light and stone into something that moves you daily.",
    author: "Sofia Nakamura",
    role: "Obsidian Pavilion, Kyoto"
  },
  {
    quote:
      "The rare firm that honours the budget while refusing to compromise the vision. The result exceeds everything we dared to imagine.",
    author: "James Hargreaves",
    role: "Skyline Penthouse, New York"
  },
  {
    quote:
      "From the first sketch to the final brass plate, every detail bore the studio's signature. It is architecture with a soul.",
    author: "Amara & Tunde Adeyemi",
    role: "Cove Residence, Mexico"
  }
];

export const NAV = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/#studio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" }
];
