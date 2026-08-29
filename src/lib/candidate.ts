export type CandidateProfile = {
  name: string;
  summary: string;
  experience: string[];
  skills: string[];
};

export const defaultCandidate: CandidateProfile = {
  name: "Saulo Zabot Luciano",
  summary:
    "Line Cook with 9+ years of high-volume kitchen experience across à la carte and buffet service, including sushi, pizza, and high-volume grill/barbecue stations. Fast, precise, and consistent under pressure during peak service.",
  experience: [
    "Senior Cook / Chef — Hotel Fazenda Pomerland, Pomerode, SC, Brazil — Present (6 months). Prepared and executed daily meal service for hotel guests; specialized in traditional German, Pomeranian, and Italian cuisine.",
    "Sushi Chef — Taji Seasonal, Balneário Camboriú, SC, Brazil — 2020–2022. Fish butchery, filleting, and curing; seasoned shari (sushi rice); prepared sushi, sashimi, and hot dishes from Japanese cuisine under strict food safety standards.",
    "Senior Cook — Fazano, Santa Gertrudes, SP, Brazil — Sep 2019–Apr 2020. Prepared, plated, and finished à la carte dishes.",
    "Senior Cook and Canteen Chef — Villa Galé, Cabo de Santo Agostinho, PE, Brazil — Aug 2017–Nov 2018. Executed à la carte dishes and ran buffet service with standardized mise en place across a rotating international menu.",
    "Senior Cook — Hotel Enseada dos Corais, Pernambuco, Brazil — May 2016–May 2017. Prepared Northeastern Brazilian coastal dishes and Portuguese cuisine.",
  ],
  skills: [
    "High-Volume Line Cooking (À la Carte & Buffet)",
    "Sushi Preparation & Fish Butchery",
    "Pizza Dough Handling & Deck/Wood Oven Operation",
    "Grill & High-Volume Barbecue (Churrasco-Style)",
    "Knife Skills / Mise en Place",
    "HACCP Food Safety Standards",
    "Multi-Station Coordination During Rush Service",
  ],
};
