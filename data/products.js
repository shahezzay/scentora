// Product catalogue. Prices here are the source of truth: the orders API reads them on the server.

export const collections = [
  { slug: "frontpage", title: "Shop All", description: "Every fragrance, candle and mist in the Scentora range." },
  { slug: "perfume-for-him", title: "Men", description: "Bold woods, crisp citrus and warm spice for him." },
  { slug: "perfume-for-her", title: "Women", description: "Soft florals, creamy vanilla and elegant musks for her." },
  { slug: "unisex", title: "Unisex", description: "Balanced scents that suit everyone." },
  { slug: "mist", title: "Body Mists", description: "Light, fresh mists for everyday wear." },
  { slug: "100-ml", title: "100ML Perfumes", description: "Our signature scents in the big bottle." },
  { slug: "candles", title: "Scented Candles", description: "Hand-poured candles to warm up any room." },
  { slug: "oud-collection", title: "Oud Collection", description: "Deep, smoky and rich oud fragrances." },
  { slug: "best-sellings", title: "Best Sellers", description: "The scents our customers keep coming back for." },
  { slug: "crazy-deals", title: "Bundle Deals", description: "Mix and match more bottles for less." },
  { slug: "series-one", title: "Aarambh Series", description: "Our brand-new launch series of six signature scents." },
];

export const products = [
  // ---------- Men ----------
  {
    slug: "desert-oud-50ml", name: "Desert Oud 50ML", price: 1799, compareAt: 2000, size: "50ml", rating: 4.8, reviews: 194,
    collections: ["frontpage", "perfume-for-him", "oud-collection", "best-sellings"],
    colors: ["#3b2417", "#b8893b"], family: "Oud & Saffron",
    notes: { top: "Saffron, Cardamom", heart: "Oud, Rose", base: "Amber, Vanilla" },
    description: "A warm, resinous oud lifted with saffron. Made for evenings, weddings and cooler weather.",
  },
  {
    slug: "citrus-rush-50ml", name: "Citrus Rush 50ML", price: 1899, compareAt: 2000, size: "50ml", rating: 4.7, reviews: 102,
    collections: ["frontpage", "perfume-for-him", "best-sellings"],
    colors: ["#e8c547", "#2f6f4f"], family: "Fresh Citrus",
    notes: { top: "Lemon, Bergamot", heart: "Green Tea, Mint", base: "Musk, Cedar" },
    description: "Crisp, sparkling and effortless. A daily-wear citrus that stays fresh in the heat.",
  },
  {
    slug: "midnight-wolf-50ml", name: "Midnight Wolf 50ML", price: 1899, compareAt: 2400, size: "50ml", rating: 4.9, reviews: 38,
    collections: ["frontpage", "perfume-for-him", "best-sellings"],
    colors: ["#1b2a49", "#8fa4c9"], family: "Spicy Woods",
    notes: { top: "Black Pepper, Grapefruit", heart: "Lavender, Geranium", base: "Ambroxan, Patchouli" },
    description: "Dark, confident and long-lasting. Pepper and lavender over a smooth woody base.",
  },
  {
    slug: "pulse-noir-50ml", name: "Pulse Noir 50ML", price: 1799, compareAt: 2000, size: "50ml", rating: 4.6, reviews: 114,
    collections: ["frontpage", "perfume-for-him", "best-sellings"],
    colors: ["#222222", "#c4566b"], family: "Sweet Oriental",
    notes: { top: "Pink Pepper, Apple", heart: "Tonka, Cinnamon", base: "Tobacco, Amber" },
    description: "Sweet tobacco and warm spice with a smooth, magnetic drydown.",
  },
  {
    slug: "pine-harbour-50ml", name: "Pine Harbour 50ML", price: 1699, compareAt: 2000, size: "50ml", rating: 4.5, reviews: 61,
    collections: ["frontpage", "perfume-for-him", "unisex"],
    colors: ["#2b6777", "#c8d8e4"], family: "Aquatic",
    notes: { top: "Sea Salt, Juniper", heart: "Pine, Sage", base: "Driftwood, Musk" },
    description: "A cool ocean breeze in a bottle, ideal for the office and summer days.",
  },
  {
    slug: "office-clean-50ml", name: "Office Clean 50ML", price: 1699, compareAt: 2000, size: "50ml", rating: 4.4, reviews: 47,
    collections: ["frontpage", "perfume-for-him"],
    colors: ["#dfe7ee", "#52606d"], family: "Clean Musk",
    notes: { top: "Neroli, Pear", heart: "White Tea, Iris", base: "Clean Musk" },
    description: "Soft, tidy and professional. A skin-close scent that never overpowers a room.",
  },

  // ---------- Women ----------
  {
    slug: "velvet-bloom-50ml", name: "Velvet Bloom 50ML", price: 1699, compareAt: 2000, size: "50ml", rating: 4.8, reviews: 55,
    collections: ["frontpage", "perfume-for-her", "best-sellings"],
    colors: ["#d98aa6", "#fbe3ea"], family: "Floral",
    notes: { top: "Peony, Pink Pepper", heart: "Rose, Jasmine", base: "Sandalwood, Musk" },
    description: "A romantic bouquet of rose and jasmine wrapped in soft sandalwood.",
  },
  {
    slug: "amber-petal-50ml", name: "Amber Petal 50ML", price: 1699, compareAt: 2000, size: "50ml", rating: 4.7, reviews: 34,
    collections: ["frontpage", "perfume-for-her"],
    colors: ["#e09f3e", "#fbe8c8"], family: "Floral Amber",
    notes: { top: "Mandarin, Freesia", heart: "Orange Blossom", base: "Amber, Vanilla" },
    description: "Sunny, warm and feminine. Orange blossom glowing over amber.",
  },
  {
    slug: "queen-whisper-50ml", name: "Queen Whisper 50ML", price: 1599, compareAt: 2000, size: "50ml", rating: 4.6, reviews: 29,
    collections: ["frontpage", "perfume-for-her"],
    colors: ["#7b3f61", "#e8c1d6"], family: "Fruity Gourmand",
    notes: { top: "Raspberry, Pear", heart: "Vanilla Orchid", base: "Praline, Musk" },
    description: "Playful fruit and creamy vanilla, made for date nights and celebrations.",
  },
  {
    slug: "silk-orchid-50ml", name: "Silk Orchid 50ML", price: 1599, compareAt: 2000, size: "50ml", rating: 4.5, reviews: 23,
    collections: ["frontpage", "perfume-for-her", "unisex"],
    colors: ["#9d79bc", "#efe3f7"], family: "Powdery Floral",
    notes: { top: "Bergamot, Lychee", heart: "Orchid, Violet", base: "Cashmere Wood" },
    description: "Smooth, powdery and calm. A quiet luxury scent for every day.",
  },
  {
    slug: "berry-grace-50ml", name: "Berry Grace 50ML", price: 1699, compareAt: 2000, size: "50ml", rating: 4.7, reviews: 41,
    collections: ["frontpage", "perfume-for-her"],
    colors: ["#a23b72", "#f4c2d7"], family: "Fruity Floral",
    notes: { top: "Blackberry, Lemon", heart: "Peony, Rose", base: "Cedar, Vanilla" },
    description: "Juicy berries and fresh petals with a clean, graceful finish.",
  },

  // ---------- Unisex ----------
  {
    slug: "soft-cashmere-50ml", name: "Soft Cashmere 50ML", price: 1799, compareAt: 2000, size: "50ml", rating: 4.8, reviews: 66,
    collections: ["frontpage", "unisex", "best-sellings"],
    colors: ["#c9b8a3", "#f3ece2"], family: "Warm Musk",
    notes: { top: "Cardamom, Bergamot", heart: "Iris, Almond", base: "Cashmere Wood, Musk" },
    description: "A cosy, skin-hugging musk that smells like your favourite sweater.",
  },
  {
    slug: "smoky-tea-50ml", name: "Smoky Tea 50ML", price: 1799, compareAt: 2000, size: "50ml", rating: 4.6, reviews: 18,
    collections: ["frontpage", "unisex"],
    colors: ["#4a3b32", "#b59a7d"], family: "Smoky Tea",
    notes: { top: "Black Tea, Bergamot", heart: "Birch, Fig", base: "Leather, Vetiver" },
    description: "Dark tea, soft smoke and a hint of leather. Unusual and unforgettable.",
  },

  // ---------- 100ML ----------
  {
    slug: "desert-oud-100ml", name: "Desert Oud 100ML", price: 2999, compareAt: 3299, size: "100ml", rating: 4.9, reviews: 204,
    collections: ["frontpage", "100-ml", "oud-collection", "perfume-for-him", "best-sellings"],
    colors: ["#3b2417", "#b8893b"], family: "Oud & Saffron",
    notes: { top: "Saffron, Cardamom", heart: "Oud, Rose", base: "Amber, Vanilla" },
    description: "Our best-selling oud in the generous 100ml bottle.",
  },
  {
    slug: "citrus-rush-100ml", name: "Citrus Rush 100ML", price: 2999, compareAt: 3499, size: "100ml", rating: 4.8, reviews: 97,
    collections: ["frontpage", "100-ml", "perfume-for-him"],
    colors: ["#e8c547", "#2f6f4f"], family: "Fresh Citrus",
    notes: { top: "Lemon, Bergamot", heart: "Green Tea, Mint", base: "Musk, Cedar" },
    description: "Crisp citrus freshness, now in 100ml for all-season wear.",
  },
  {
    slug: "royal-saffron-100ml", name: "Royal Saffron 100ML", price: 3100, compareAt: 3499, size: "100ml", rating: 4.7, reviews: 37,
    collections: ["frontpage", "100-ml", "oud-collection", "unisex"],
    colors: ["#8c2f39", "#e9b872"], family: "Saffron Amber",
    notes: { top: "Saffron, Pink Pepper", heart: "Amberwood", base: "Ambergris, Cedar" },
    description: "Regal saffron and glowing amberwood, bottled in 100ml.",
  },
  {
    slug: "ember-100ml", name: "Ember 100ML", price: 3899, compareAt: 4400, size: "100ml", rating: 4.8, reviews: 58,
    collections: ["frontpage", "100-ml", "perfume-for-him", "unisex"],
    colors: ["#b5391f", "#f2a65a"], family: "Warm Spice",
    notes: { top: "Cinnamon, Orange", heart: "Cedar, Labdanum", base: "Tonka, Vanilla" },
    description: "A fiery, comforting spice with a sweet, smouldering base.",
  },

  // ---------- Oud ----------
  {
    slug: "oud-essence-50ml", name: "Oud Essence 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.7, reviews: 45,
    collections: ["frontpage", "oud-collection", "unisex"],
    colors: ["#2a1b14", "#9c6b3e"], family: "Oud",
    notes: { top: "Bergamot", heart: "Agarwood, Incense", base: "Leather, Patchouli" },
    description: "Pure, smoky agarwood for those who love a serious oud.",
  },
  {
    slug: "dream-oud-50ml", name: "Dream Oud 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.6, reviews: 31,
    collections: ["frontpage", "oud-collection", "unisex"],
    colors: ["#4b2e4f", "#d8b4a0"], family: "Sweet Oud",
    notes: { top: "Plum, Saffron", heart: "Oud, Turkish Rose", base: "Praline, Amber" },
    description: "Sweeter, softer oud with rose and a hint of praline.",
  },
  {
    slug: "oud-velvet-50ml", name: "Oud Velvet 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.8, reviews: 52,
    collections: ["frontpage", "oud-collection", "perfume-for-him"],
    colors: ["#5a1f2b", "#c8a165"], family: "Leather Oud",
    notes: { top: "Cinnamon, Saffron", heart: "Oud, Suede", base: "Musk, Sandalwood" },
    description: "Oud wrapped in suede and spice, rich and smooth like velvet.",
  },

  // ---------- Series One ----------
  {
    slug: "manzil-50ml", name: "Manzil 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.7, reviews: 24,
    collections: ["frontpage", "series-one", "perfume-for-him"],
    colors: ["#1f3b4d", "#9fc5e8"], family: "Fresh Spicy",
    notes: { top: "Grapefruit, Ginger", heart: "Sage, Violet Leaf", base: "Cedar, Ambroxan" },
    description: "The destination. Fresh and spicy with a modern woody finish.",
  },
  {
    slug: "aasra-50ml", name: "Aasra 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.6, reviews: 19,
    collections: ["frontpage", "series-one", "perfume-for-her"],
    colors: ["#c27ba0", "#fce5cd"], family: "Floral Fruity",
    notes: { top: "Pear, Mandarin", heart: "Magnolia, Jasmine", base: "Musk, Vanilla" },
    description: "Gentle and hopeful. Pear and magnolia over soft vanilla.",
  },
  {
    slug: "sakoon-50ml", name: "Sakoon 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.8, reviews: 27,
    collections: ["frontpage", "series-one", "unisex"],
    colors: ["#6a8f6e", "#e6efe4"], family: "Green Woody",
    notes: { top: "Fig Leaf, Basil", heart: "Green Tea, Cedar", base: "Moss, Musk" },
    description: "Calm in a bottle. Green, woody and effortlessly peaceful.",
  },
  {
    slug: "junoon-50ml", name: "Junoon 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.9, reviews: 33,
    collections: ["frontpage", "series-one", "perfume-for-him"],
    colors: ["#7a1f1f", "#f0b429"], family: "Spicy Amber",
    notes: { top: "Cardamom, Orange", heart: "Cinnamon, Clove", base: "Amber, Leather" },
    description: "Passion and intensity. A bold spice and amber statement.",
  },
  {
    slug: "khayal-50ml", name: "Khayal 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.5, reviews: 16,
    collections: ["frontpage", "series-one", "perfume-for-her"],
    colors: ["#8e7cc3", "#d9d2e9"], family: "Powdery Vanilla",
    notes: { top: "Bergamot, Peach", heart: "Heliotrope, Iris", base: "Vanilla, Sandalwood" },
    description: "A dreamy, powdery vanilla that lingers like a thought.",
  },
  {
    slug: "ishq-50ml", name: "Ishq 50ML", price: 1999, compareAt: 2400, size: "50ml", rating: 4.8, reviews: 29,
    collections: ["frontpage", "series-one", "perfume-for-her"],
    colors: ["#9b1d42", "#f4cccc"], family: "Rose Gourmand",
    notes: { top: "Raspberry, Lychee", heart: "Damask Rose", base: "Caramel, Patchouli" },
    description: "Deep rose with a caramel glow. Made for love stories.",
  },

  // ---------- Mists ----------
  {
    slug: "ocean-mist", name: "Ocean Breeze Mist", price: 850, size: "250ml", rating: 4.5, reviews: 0,
    collections: ["frontpage", "mist"],
    colors: ["#4aa3c7", "#d6f0fa"], family: "Aquatic Mist",
    notes: { top: "Sea Spray", heart: "Water Lily", base: "Musk" },
    description: "A cool, clean mist that feels like a sea breeze.",
  },
  {
    slug: "rose-blush-mist", name: "Rose Blush Mist", price: 750, size: "250ml", rating: 4.6, reviews: 0,
    collections: ["frontpage", "mist"],
    colors: ["#e58fa8", "#fde7ee"], family: "Rose Mist",
    notes: { top: "Pink Grapefruit", heart: "Rose Petals", base: "Soft Musk" },
    description: "A soft, rosy mist for a light touch of fragrance.",
  },
  {
    slug: "cloud-petal-mist", name: "Cloud Petal Mist", price: 1050, size: "250ml", rating: 4.7, reviews: 0,
    collections: ["frontpage", "mist"],
    colors: ["#b4a7d6", "#f0ecfa"], family: "Floral Mist",
    notes: { top: "Pear", heart: "Peony, Freesia", base: "White Musk" },
    description: "Airy florals that feel as light as a cloud.",
  },
  {
    slug: "citrus-veil-mist", name: "Citrus Veil Mist", price: 950, size: "250ml", rating: 4.4, reviews: 0,
    collections: ["frontpage", "mist"],
    colors: ["#f6b26b", "#fff2cc"], family: "Citrus Mist",
    notes: { top: "Orange, Lemon", heart: "Neroli", base: "Light Musk" },
    description: "Sparkling citrus that wakes up your senses.",
  },

  // ---------- Candles ----------
  {
    slug: "smoked-wood-candle", name: "Smoked Wood Candle", price: 1750, compareAt: 2399, size: "105g", rating: 4.8, reviews: 21,
    collections: ["frontpage", "candles"],
    colors: ["#3d2b1f", "#c68b59"], family: "Smoky Woods", kind: "candle",
    notes: { top: "Smoke", heart: "Oud", base: "Amber" },
    description: "A deep, smoky candle that fills the room with warm woods.",
  },
  {
    slug: "dark-roast-candle", name: "Dark Roast Candle", price: 1850, compareAt: 2399, size: "105g", rating: 4.7, reviews: 52,
    collections: ["frontpage", "candles"],
    colors: ["#2d1e16", "#a47148"], family: "Coffee", kind: "candle",
    notes: { top: "Espresso", heart: "Cocoa", base: "Vanilla" },
    description: "The comforting smell of freshly roasted coffee beans.",
  },
  {
    slug: "jasmine-night-candle", name: "Jasmine Night Candle", price: 1820, compareAt: 2399, size: "105g", rating: 4.8, reviews: 41,
    collections: ["frontpage", "candles"],
    colors: ["#e8e0d0", "#a8896b"], family: "White Floral", kind: "candle",
    notes: { top: "Green Leaves", heart: "Jasmine", base: "Musk" },
    description: "A romantic, creamy jasmine candle for quiet evenings.",
  },
  {
    slug: "vanilla-cream-candle", name: "Vanilla Cream Candle", price: 1790, compareAt: 2399, size: "105g", rating: 4.6, reviews: 12,
    collections: ["frontpage", "candles"],
    colors: ["#f3e5ab", "#c9a66b"], family: "Vanilla", kind: "candle",
    notes: { top: "Cream", heart: "Vanilla Bean", base: "Sugar, Musk" },
    description: "Sweet and soft vanilla that feels like a warm hug.",
  },

  // ---------- Bundles & Extras ----------
  {
    slug: "buy-3-get-50ml-free", name: "Buy 3 x 50ML Get 50ML Free", price: 4444, compareAt: 7100, size: "4 x 50ml", rating: 4.8, reviews: 0,
    collections: ["crazy-deals"], colors: ["#111111", "#b8893b"], family: "Bundle", kind: "bundle",
    notes: { top: "Your choice", heart: "Your choice", base: "Your choice" },
    description: "Pick any three 50ml perfumes and get a fourth one free.",
  },
  {
    slug: "2x-100ml-deal", name: "2X 100ML Deal", price: 4800, compareAt: 6000, size: "2 x 100ml", rating: 4.8, reviews: 72,
    collections: ["crazy-deals", "100-ml"], colors: ["#3b2417", "#b8893b"], family: "Bundle", kind: "bundle",
    notes: { top: "Your choice", heart: "Your choice", base: "Your choice" },
    description: "Two 100ml bottles at a special bundle price.",
  },
  {
    slug: "top-3-best-sellers", name: "Top 3 Best Sellers", price: 4400, compareAt: 5600, size: "3 x 50ml", rating: 4.9, reviews: 289,
    collections: ["crazy-deals", "best-sellings"], colors: ["#2b6777", "#e8c547"], family: "Bundle", kind: "bundle",
    notes: { top: "Our top 3", heart: "Our top 3", base: "Our top 3" },
    description: "Our three most-loved perfumes in one value pack.",
  },
  {
    slug: "body-mist-2x-deal", name: "Body Mist 2X Deal", price: 1699, compareAt: 2000, size: "2 x 250ml", rating: 4.6, reviews: 0,
    collections: ["crazy-deals", "mist"], colors: ["#4aa3c7", "#e58fa8"], family: "Bundle", kind: "bundle",
    notes: { top: "Your choice", heart: "Your choice", base: "Your choice" },
    description: "Any two body mists at a reduced price.",
  },
  {
    slug: "3x-perfume-bundle", name: "3x Perfume Bundle", price: 4444, compareAt: 5700, size: "3 x 50ml", rating: 4.7, reviews: 0,
    collections: ["crazy-deals"], colors: ["#7b3f61", "#e0c068"], family: "Bundle", kind: "bundle",
    notes: { top: "Your choice", heart: "Your choice", base: "Your choice" },
    description: "Any three 50ml perfumes for one bundle price.",
  },
  {
    slug: "4x-perfume-bundle", name: "4x Perfume Bundle", price: 5599, compareAt: 7596, size: "4 x 50ml", rating: 4.8, reviews: 0,
    collections: ["crazy-deals"], colors: ["#1f3b4d", "#e0c068"], family: "Bundle", kind: "bundle",
    notes: { top: "Your choice", heart: "Your choice", base: "Your choice" },
    description: "Any four 50ml perfumes for one bundle price.",
  },
  {
    slug: "6x-mega-deal", name: "6x Mega Deal", price: 8399, compareAt: 11400, size: "6 x 50ml", rating: 4.9, reviews: 0,
    collections: ["crazy-deals"], colors: ["#111111", "#c4566b"], family: "Bundle", kind: "bundle",
    notes: { top: "Your choice", heart: "Your choice", base: "Your choice" },
    description: "Six 50ml perfumes at our biggest saving.",
  },
  {
    slug: "tester-box", name: "Tester Box", price: 1200, size: "6 x 2ml", rating: 4.9, reviews: 88,
    collections: ["frontpage", "crazy-deals"], colors: ["#b8893b", "#f6f1ea"], family: "Sampler", kind: "bundle",
    notes: { top: "Six samples", heart: "Six samples", base: "Six samples" },
    description: "Try six of our scents before you commit to a full bottle.",
  },
  {
    slug: "gift-box", name: "Premium Gift Box", price: 250, size: "Box", rating: 4.9, reviews: 0,
    collections: ["frontpage"], colors: ["#111111", "#b8893b"], family: "Gift", kind: "bundle",
    notes: { top: "-", heart: "-", base: "-" },
    description: "A premium black gift box for any bottle.",
  },
  {
    slug: "his-and-hers-duo", name: "The Him & Her Duo Box", price: 3299, compareAt: 4000, size: "2 x 50ml", rating: 4.8, reviews: 36,
    collections: ["frontpage", "crazy-deals"], colors: ["#1b2a49", "#d98aa6"], family: "Duo", kind: "bundle",
    notes: { top: "One for him", heart: "One for her", base: "Gift ready" },
    description: "One perfume for him and one for her in a gift-ready box.",
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug) {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(slug) {
  if (slug === "frontpage") return products;
  return products.filter((p) => p.collections.includes(slug));
}

export function discountPercent(p) {
  if (!p.compareAt) return 0;
  return Math.round(((p.compareAt - p.price) / p.compareAt) * 100);
}

export function formatPrice(n) {
  return "Rs." + n.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const reviewsData = [
  { name: "Ayesha K.", city: "Lahore", rating: 5, title: "Lasts all day", body: "I wore it to work and it was still there at night. Got so many compliments." },
  { name: "Hamza R.", city: "Karachi", rating: 5, title: "Great value", body: "Smells premium and the price is very fair. Ordering the 100ml next." },
  { name: "Sana M.", city: "Islamabad", rating: 4, title: "Beautiful floral", body: "Soft and elegant. I would love a slightly stronger projection but I still love it." },
  { name: "Bilal A.", city: "Faisalabad", rating: 5, title: "Fast delivery", body: "Arrived in two days with neat packaging. The oud is really rich." },
  { name: "Mehwish S.", city: "Multan", rating: 5, title: "Perfect gift", body: "Bought the duo box for my parents' anniversary. They loved it." },
  { name: "Usman T.", city: "Quetta", rating: 4, title: "Good for summer", body: "The citrus one holds up well in the heat. Very fresh." },
];
