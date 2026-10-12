export type GalleryArtwork = {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  collection: string;
  status: string;
  src: string;
  description: string;
};

export const GALLERY_ARTWORKS: GalleryArtwork[] = [
  {
    id: "artwork-smoked-out-halo",
    title: "SMOKED OUT HALO",
    year: "Not specified",
    medium: "Acrylic on canvas",
    dimensions: "Not specified",
    collection: "Cosmic & Extraterrestrial",
    status: "Available",
    src: "/gallery/art-1.JPG",
    description: "An extraterrestrial portrait titled Smoked Out Halo."
  },
  {
    id: "artwork-volcanic-vision",
    title: "VOLCANIC VISION",
    year: "Not specified",
    medium: "Acrylic on canvas",
    dimensions: "Not specified",
    collection: "Cosmic & Extraterrestrial",
    status: "Available",
    src: "/gallery/art-2.JPG",
    description: "An alien-inspired painting titled Volcanic Vision."
  },
  {
    id: "artwork-planet-walk",
    title: "PLANET WALK",
    year: "Not specified",
    medium: "Acrylic on canvas",
    dimensions: "Not specified",
    collection: "Cosmic & Extraterrestrial",
    status: "Reserved",
    src: "/gallery/art-3.JPG",
    description: "A cosmic scene featuring an alien figure, titled Planet Walk."
  },
  {
    id: "artwork-no-fcks-given",
    title: "NO F#CKS GIVEN",
    year: "Not specified",
    medium: "Acrylic on canvas",
    dimensions: "Not specified",
    collection: "Visages & Monoliths",
    status: "Available",
    src: "/gallery/art-4.JPG",
    description: "An irreverent alien artwork titled No F#cks Given."
  },
  {
    id: "artwork-the-grey-stare",
    title: "THE GREY STARE",
    year: "Not specified",
    medium: "Acrylic on canvas",
    dimensions: "Not specified",
    collection: "Visages & Monoliths",
    status: "Available",
    src: "/gallery/art-5.JPG",
    description: "An alien portrait focused on the gaze, titled The Grey Stare."
  },
  {
    id: "artwork-abduction-protocol",
    title: "ABDUCTION PROTOCOL",
    year: "Not specified",
    medium: "Acrylic on canvas",
    dimensions: "Not specified",
    collection: "Cosmic & Extraterrestrial",
    status: "Available",
    src: "/gallery/art-6.JPG",
    description: "A UFO-themed painting titled Abduction Protocol."
  },
  {
    id: "artwork-apocalyptic-vision",
    title: "APOCALYPTIC VISION",
    year: "Not specified",
    medium: "Acrylic on canvas",
    dimensions: "Not specified",
    collection: "Abstract Energy",
    status: "Reserved",
    src: "/gallery/art-7.JPG",
    description: "A surreal alien painting titled Apocalyptic Vision."
  },
  {
    id: "artwork-the-specimen",
    title: "THE SPECIMEN",
    year: "Not specified",
    medium: "Acrylic on canvas",
    dimensions: "Not specified",
    collection: "Visages & Monoliths",
    status: "Available",
    src: "/gallery/art-8.JPG",
    description: "An alien artwork presented as a specimen, titled The Specimen."
  }
];

export const FEATURED_ARTWORK_IDS = [
  "artwork-smoked-out-halo",
  "artwork-planet-walk",
  "artwork-the-grey-stare"
];
