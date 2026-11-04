// Services shown on the homepage, /services and in the enquiry form.

export type Service = {
  slug: "photography" | "cinematography" | "both";
  name: string;
  summary: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "photography",
    name: "Photography",
    summary: "Unposed, documentary-leaning frames of every event, with a few considered portraits.",
    includes: [
      "Full coverage of the events you choose",
      "Two photographers for the main ceremony days",
      "Edited gallery delivered online, with a print-ready set",
      "[DRAFT] Delivery in 6 to 8 weeks",
    ],
  },
  {
    slug: "cinematography",
    name: "Cinematography",
    summary: "A short, graded film of your days, with the voices and sounds that matter kept in.",
    includes: [
      "Cinematic edit of the main ceremony and celebrations",
      "A teaser of 2 to 3 minutes and a full film of 10 to 20 minutes",
      "Gimbal and handheld work with natural sound",
      "[DRAFT] Delivery in 8 to 10 weeks",
    ],
  },
  {
    slug: "both",
    name: "Both",
    summary: "Photography and film from the same team, so the two stories agree with each other.",
    includes: [
      "Everything in Photography and Cinematography",
      "One coordinated plan so the crews never get in each other's way",
      "A shared timeline and one point of contact",
      "[DRAFT] Priority scheduling for the main days",
    ],
  },
];
