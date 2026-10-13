export type Game = {
  id: string;
  title: string;
  year: number;
  genre: string[];
  platforms: string[];
  rating: number;
  reviewCount: number;
  image: string;
  featured?: boolean;
};

export const games: Game[] = [
  {
    id: "elden-ring",
    title: "Elden Ring",
    year: 2022,
    genre: ["Action RPG", "Open World"],
    platforms: ["PC", "PS5"],
    rating: 9.5,
    reviewCount: 2847,
    image:
      "https://images.unsplash.com/photo-1762268861745-c3e879d1c2b8?auto=format&fit=crop&w=1400&q=85",
    featured: true,
  },
  {
    id: "verdant-divide",
    title: "Verdant Divide",
    year: 2024,
    genre: ["Adventure", "Indie"],
    platforms: ["PC", "Switch"],
    rating: 8.9,
    reviewCount: 1342,
    image:
      "https://images.unsplash.com/photo-1568508298833-5ed1a800f1f7?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "neon-protocol",
    title: "Neon Protocol",
    year: 2025,
    genre: ["FPS", "Multiplayer"],
    platforms: ["PC", "Xbox"],
    rating: 8.7,
    reviewCount: 986,
    image:
      "https://images.unsplash.com/photo-1760753145427-c327d09ace00?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "ashen-crown",
    title: "Ashen Crown",
    year: 2023,
    genre: ["Soulslike", "RPG"],
    platforms: ["PS5", "PC"],
    rating: 9.1,
    reviewCount: 3205,
    image:
      "https://images.unsplash.com/photo-1760060530009-442149a0db16?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "hollow-pines",
    title: "Hollow Pines",
    year: 2025,
    genre: ["Horror", "Survival"],
    platforms: ["PC"],
    rating: 8.5,
    reviewCount: 647,
    image:
      "https://images.unsplash.com/photo-1745523456395-e5f8548bc1cf?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "tactical-horizon",
    title: "Tactical Horizon",
    year: 2024,
    genre: ["Strategy", "Simulation"],
    platforms: ["PC", "Xbox"],
    rating: 8.8,
    reviewCount: 1104,
    image:
      "https://images.unsplash.com/photo-1762268861745-c3e879d1c2b8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "midnight-signal",
    title: "Midnight Signal",
    year: 2025,
    genre: ["Horror", "Survival"],
    platforms: ["PC", "PS5"],
    rating: 8.6,
    reviewCount: 742,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "breach-point",
    title: "Breach Point",
    year: 2025,
    genre: ["FPS", "Action"],
    platforms: ["PC", "Xbox"],
    rating: 8.4,
    reviewCount: 519,
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85",
  },
];

export function formatReviewCount(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}
