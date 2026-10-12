export type GalleryArtwork = {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  collection: string;
  status: string;
  src: string;
  description: string;
};

export const GALLERY_ARTWORKS: GalleryArtwork[] = [
  {
    id: "artwork-stranded",
    title: "STRANDED",
    year: 2026,
    medium: "Oil and impasto on heavy Belgian linen",
    dimensions: "160 × 120 cm (63 × 47 in)",
    collection: "Cosmic & Extraterrestrial",
    status: "Available",
    src: "/gallery/stranded_alien_painting_1791650734079.jpg",
    description: "A solitary figure floats against a vivid crimson field, confronting the viewer with vulnerability and isolation."
  },
  {
    id: "artwork-emerald-visage",
    title: "EMERALD VISAGE",
    year: 2026,
    medium: "Oil, raw pigment, and graphite on stretched linen",
    dimensions: "140 × 105 cm (55 × 41 in)",
    collection: "Visages & Monoliths",
    status: "Available",
    src: "/gallery/emerald_visage_painting_1791650743793.jpg",
    description: "An otherworldly face emerges from deep shadow, its luminous green eyes set against sweeping dark brushwork."
  },
  {
    id: "artwork-cosmic-rebellion",
    title: "COSMIC REBELLION",
    year: 2025,
    medium: "Oil, alkyd, and neon dispersion on double-primed cotton canvas",
    dimensions: "180 × 220 cm (71 × 87 in)",
    collection: "Abstract Energy",
    status: "Reserved",
    src: "/gallery/cosmic_rebellion_painting_1791650753186.jpg",
    description: "Fractured celestial forms and electric lime marks cut through a field of charcoal and mineral black."
  },
  {
    id: "artwork-obsidian-monolith",
    title: "OBSIDIAN MONOLITH & TWIN MOONS",
    year: 2025,
    medium: "Oil and volcanic sand paste on reinforced linen",
    dimensions: "170 × 130 cm (67 × 51 in)",
    collection: "Visages & Monoliths",
    status: "Available",
    src: "/gallery/obsidian_monolith_painting_1791650761784.jpg",
    description: "A dark monolith rises from a spare desert landscape beneath two glowing moons."
  }
];

export const FEATURED_ARTWORK_IDS = [
  "artwork-stranded",
  "artwork-cosmic-rebellion",
  "artwork-obsidian-monolith"
];
