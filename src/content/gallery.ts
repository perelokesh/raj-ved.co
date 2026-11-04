// Gallery entries reference assets by id (see assets.ts). Alt text is editable per
// image; keep the // REPLACE ALT convention when a real photo replaces a placeholder.

export type GalleryCategory = "Ceremony" | "Portraits" | "Details" | "Celebration";

export type GalleryItem = {
  assetId: string;
  category: GalleryCategory;
  alt: string; // REPLACE ALT
  featured?: boolean;
};

export const categories: GalleryCategory[] = ["Ceremony", "Portraits", "Details", "Celebration"];

export const gallery: GalleryItem[] = [
  { assetId: "haldi-032", category: "Portraits", alt: "The couple in matching blue, foreheads touching, by the water" }, // REPLACE ALT
  { assetId: "haldi-085", category: "Portraits", alt: "The couple sitting close and holding hands in front of marigold garlands" }, // REPLACE ALT
  { assetId: "haldi-107", category: "Ceremony", alt: "The couple with their parents beside brass pots of haldi and flowers" }, // REPLACE ALT
  { assetId: "haldi-142", category: "Celebration", alt: "Friends in yellow kurtas dancing at the haldi" }, // REPLACE ALT
  { assetId: "haldi-258", category: "Ceremony", alt: "Marigold petals showering over the couple during the haldi" }, // REPLACE ALT
  { assetId: "haldi-288", category: "Celebration", alt: "The couple dancing together outdoors as guests watch" }, // REPLACE ALT
  { assetId: "haldi-317", category: "Celebration", alt: "Friends laughing and singing into a microphone at the haldi" }, // REPLACE ALT
];
