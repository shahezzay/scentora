export const posts = [
  {
    slug: "long-lasting-perfume-for-ladies",
    title: "Long-Lasting Perfumes for Ladies: What to Look For",
    date: "Oct 02, 2026",
    excerpt: "Not every scent lasts. Here is how to spot a fragrance that stays on your skin from morning to night.",
    body: [
      "A long-lasting perfume starts with concentration. Eau de parfum contains more fragrance oil than eau de toilette, which is why it tends to stay on the skin for longer.",
      "Base notes matter just as much. Vanilla, amber, musk and woods anchor a scent and keep it going after the fresh top notes have faded.",
      "Application also makes a difference. Apply to moisturised skin on pulse points such as wrists and neck, and avoid rubbing your wrists together, which can break down the fragrance.",
      "If you are not sure where to start, try a sampler box first. It lets you test how each scent behaves on your own skin before choosing a full bottle.",
    ],
  },
  {
    slug: "how-to-choose-your-signature-scent",
    title: "How to Choose Your Signature Scent",
    date: "Jul 25, 2026",
    excerpt: "A signature scent should feel like you. Here is a simple way to find yours.",
    body: [
      "Begin with the families you naturally enjoy. Fresh and citrusy, floral and soft, sweet and gourmand, or deep and woody.",
      "Test on skin, not paper. Skin chemistry changes how a perfume smells, so wait at least an hour to see how the scent settles.",
      "Think about when you will wear it. Light, fresh scents are great for daytime and hot weather. Richer, warmer scents suit evenings and cooler months.",
      "Finally, trust your reaction. The right signature scent is the one that makes you smile every time you put it on.",
    ],
  },
  {
    slug: "how-to-store-perfume-properly",
    title: "How to Store Perfume Properly (So It Lasts for Years)",
    date: "Jul 24, 2026",
    excerpt: "Heat, light and humidity are a perfume's worst enemies. Store yours the right way.",
    body: [
      "Keep your bottles away from direct sunlight. Light breaks down the delicate molecules in a fragrance and can change its colour and smell.",
      "Avoid the bathroom. Steam and temperature swings are bad for perfume. A cool drawer or wardrobe is a much better home.",
      "Keep the cap on tightly after each use, and if you still have the original box, store the bottle inside it for extra protection.",
      "Stored well, most perfumes keep their quality for several years.",
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
