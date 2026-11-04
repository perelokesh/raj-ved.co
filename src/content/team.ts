// Team. PLACEHOLDER: founder bios are [DRAFT] copy and need approval from Raj and Ved.
// Portraits are non-identifying images, see assets.ts (placeholder: true).

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  portraitAssetId: string;
};

export const founders: TeamMember[] = [
  {
    name: "Ved", // [VED BIO]
    role: "Co-founder, photography",
    bio: "[DRAFT] Ved trained as a documentary photographer and still waits quietly for the moment before he lifts the camera. He leads the photography and the portraits, and he remembers everyone's grandmother's name.",
    portraitAssetId: "chaturved",
  },
  {
    name: "Raj", // [RAJ BIO]
    role: "Co-founder, cinematography",
    bio: "[DRAFT] Raj came to weddings through the sound of them: the clink of glass, the dhol coming round the corner. He leads the film work and is happiest with a gimbal on a crowded floor.",
    portraitAssetId: "rajesh",
  },
];

export const crew: { name: string; role: string }[] = [
  { name: "[DRAFT] Crew member", role: "Second shooter" },
  { name: "[DRAFT] Crew member", role: "Editor and colourist" },
  { name: "[DRAFT] Crew member", role: "Audio" },
];
