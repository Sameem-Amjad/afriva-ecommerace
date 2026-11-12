/**
 * Afriva demo catalogue: fictional sellers, brands, shoppers and products.
 * Product photos are original flat-lay illustrations drawn by
 * scripts/make-images.mjs from the garment and pattern named here.
 */
export const DOMAIN = "demo.afriva.shop";
export const PASSWORD = "Afriva@2026";

export const SELLERS = [
  { key: "osu", email: `seller@${DOMAIN}`, name: "Ama Mensah", brand: "Osu Weave Co.", address: "Oxford Street, Osu, Accra, Ghana", colors: ["#D4A017", "#2E6B3F"], login: true },
  { key: "lekki", email: `lekki.loom@${DOMAIN}`, name: "Tunde Bakare", brand: "Lekki Loom", address: "Admiralty Way, Lekki, Lagos, Nigeria", colors: ["#1F7A7A", "#E5604D"] },
  { key: "westlands", email: `westlands.thread@${DOMAIN}`, name: "Wanjiru Kamau", brand: "Westlands Thread", address: "Woodvale Grove, Westlands, Nairobi, Kenya", colors: ["#C0392B", "#2C5AA0"] }
];

export const BUYERS = [
  { key: "amara", email: `amara.okafor@${DOMAIN}`, name: "Amara Okafor", phone: "+234 803 555 0142", city: "Abuja", country: "Nigeria", address: "14 Aminu Kano Crescent, Wuse 2", login: true },
  { key: "kofi", email: `kofi.asante@${DOMAIN}`, name: "Kofi Asante", phone: "+233 24 555 0198", city: "Kumasi", country: "Ghana", address: "Plot 9, Ahodwo Roundabout" },
  { key: "zainab", email: `zainab.yusuf@${DOMAIN}`, name: "Zainab Yusuf", phone: "+234 809 555 0177", city: "Kano", country: "Nigeria", address: "22 Bompai Road" },
  { key: "achieng", email: `achieng.otieno@${DOMAIN}`, name: "Achieng Otieno", phone: "+254 712 555 031", city: "Kisumu", country: "Kenya", address: "Oginga Odinga Street, Milimani" },
  { key: "thabo", email: `thabo.nkosi@${DOMAIN}`, name: "Thabo Nkosi", phone: "+27 82 555 0163", city: "Johannesburg", country: "South Africa", address: "41 Jan Smuts Avenue, Rosebank" },
  { key: "fatou", email: `fatou.diallo@${DOMAIN}`, name: "Fatou Diallo", phone: "+221 77 555 0119", city: "Dakar", country: "Senegal", address: "Rue 10, Point E" },
  { key: "james", email: `james.mwangi@${DOMAIN}`, name: "James Mwangi", phone: "+254 722 555 088", city: "Mombasa", country: "Kenya", address: "Nyali Road, Nyali" }
];

export const CATEGORIES = [
  { name: "Men", subcategories: ["Shirts", "Tunics", "Suits", "Jackets", "Trousers"], tint: "#2B3A67" },
  { name: "Women", subcategories: ["Dresses", "Skirts", "Tops"], tint: "#C2185B" },
  { name: "Kids", subcategories: ["Sets", "Dresses"], tint: "#4A90C2" },
  { name: "Accessories", subcategories: ["Scarves", "Hats", "Headwraps", "Bags"], tint: "#B07A4A" }
];

const ADULT = ["S", "M", "L", "XL"];
const KIDS = ["2-3Y", "4-5Y", "6-7Y"];
const ONE = ["One Size"];

// garment: shirt | tunic | suit | robe | jacket | trousers | dress | maxi | skirt | top | kidset | kiddress | scarf | hat | headwrap | bag
// pattern: kente | adinkra | wax | adire | mudcloth | check | kikoi | beads | linen | shimmer
export const PRODUCTS = [
  { slug: "kente-stripe-shirt", seller: "osu", name: "Kente Stripe Shirt", category: "Men", sub: ["Shirts"], garment: "shirt", pattern: "kente",
    colors: [["Gold", "#D4A017"], ["Forest", "#2E6B3F"]], sizes: ADULT, price: 48, discount: 10, fee: 5, stock: 14, sold: 132, days: 40,
    description: "A short-sleeved camp-collar shirt in a woven kente-style stripe. Lightweight cotton, coconut buttons and a straight hem that works tucked or loose." },
  { slug: "adinkra-print-tunic", seller: "osu", name: "Adinkra Print Tunic", category: "Men", sub: ["Tunics"], garment: "tunic", pattern: "adinkra",
    colors: [["Indigo", "#2B3A67"], ["Clay", "#B5523B"]], sizes: ["M", "L", "XL"], price: 42, discount: 0, fee: 5, stock: 12, sold: 88, days: 34,
    description: "A relaxed hip-length tunic stamped with adinkra-inspired symbols. Embroidered neckline, side splits and breathable cotton for warm days." },
  { slug: "kente-wrap-skirt", seller: "osu", name: "Kente Wrap Skirt", category: "Women", sub: ["Skirts"], garment: "skirt", pattern: "kente",
    colors: [["Sunset", "#E07A1F"], ["Royal", "#3A4FA0"]], sizes: ["S", "M", "L"], price: 39, discount: 15, fee: 4, stock: 10, sold: 64, days: 28,
    description: "A midi wrap skirt in a bold kente-style weave with a tie waist, so it adjusts as you like. Fully lined." },
  { slug: "kente-stole-scarf", seller: "osu", name: "Kente Stole Scarf", category: "Accessories", sub: ["Scarves"], garment: "scarf", pattern: "kente",
    colors: [["Gold", "#D4A017"], ["Crimson", "#A4243B"]], sizes: ONE, price: 25, discount: 0, fee: 3, stock: 20, sold: 151, days: 52,
    description: "A hand-finished stole with fringed ends, woven in a kente-style stripe. Wear it as a scarf, a sash or a graduation stole." },
  { slug: "kids-adinkra-shirt-shorts", seller: "osu", name: "Kids Adinkra Shirt & Shorts", category: "Kids", sub: ["Sets"], garment: "kidset", pattern: "adinkra",
    colors: [["Sky", "#4A90C2"], ["Mango", "#F2A541"]], sizes: KIDS, price: 29, discount: 0, fee: 4, stock: 12, sold: 47, days: 18,
    description: "A matching shirt and elastic-waist shorts in a soft adinkra print. Easy snaps, easy wash, ready for any celebration." },
  { slug: "linen-senator-suit", seller: "osu", name: "Linen Senator Suit", category: "Men", sub: ["Suits"], garment: "suit", pattern: "linen",
    colors: [["Sand", "#CDB891"], ["Charcoal", "#3B3B3B"]], sizes: ["M", "L", "XL"], price: 120, discount: 10, fee: 8, stock: 8, sold: 39, days: 9,
    description: "A two-piece senator suit in washed linen: a long tunic with a clean mandarin collar and tapered trousers. Tailored, not stiff." },

  { slug: "ankara-wrap-dress", seller: "lekki", name: "Ankara Wrap Dress", category: "Women", sub: ["Dresses"], garment: "dress", pattern: "wax",
    colors: [["Teal", "#1F7A7A"], ["Coral", "#E5604D"]], sizes: ["S", "M", "L"], price: 65, discount: 20, fee: 6, stock: 12, sold: 174, days: 46,
    description: "A wax-print wrap dress with flutter sleeves and a self-tie waist. Cotton that holds its colour wash after wash." },
  { slug: "adire-kaftan-maxi", seller: "lekki", name: "Adire Kaftan Maxi", category: "Women", sub: ["Dresses"], garment: "maxi", pattern: "adire",
    colors: [["Indigo", "#2B3A67"], ["Ochre", "#C98B2B"]], sizes: ["S/M", "L/XL"], price: 78, discount: 0, fee: 6, stock: 9, sold: 58, days: 21,
    description: "A floor-length kaftan in hand-dyed adire-style resist print. Loose and airy, with a keyhole neck and deep side pockets." },
  { slug: "ankara-bucket-hat", seller: "lekki", name: "Ankara Bucket Hat", category: "Accessories", sub: ["Hats"], garment: "hat", pattern: "wax",
    colors: [["Teal", "#1F7A7A"], ["Coral", "#E5604D"]], sizes: ONE, price: 22, discount: 0, fee: 3, stock: 25, sold: 96, days: 31,
    description: "A reversible bucket hat: wax print on one side, solid cotton on the other. Stitched brim that keeps its shape." },
  { slug: "gele-headwrap", seller: "lekki", name: "Gele Headwrap", category: "Accessories", sub: ["Headwraps"], garment: "headwrap", pattern: "shimmer",
    colors: [["Champagne", "#E8D3A2"], ["Fuchsia", "#C2185B"]], sizes: ONE, price: 30, discount: 0, fee: 3, stock: 18, sold: 83, days: 26,
    description: "A crisp gele in a shimmer weave that holds a sculpted tie. Generous length for fans, pleats and every style in between." },
  { slug: "kids-ankara-party-dress", seller: "lekki", name: "Kids Ankara Party Dress", category: "Kids", sub: ["Dresses"], garment: "kiddress", pattern: "wax",
    colors: [["Lilac", "#9C7BC0"], ["Lime", "#8DBF3F"]], sizes: KIDS, price: 34, discount: 10, fee: 4, stock: 10, sold: 52, days: 14,
    description: "A twirl-ready party dress with a gathered skirt and puff sleeves, in a cheerful wax print. Cotton lining, button back." },
  { slug: "agbada-three-piece", seller: "lekki", name: "Agbada Three-Piece", category: "Men", sub: ["Suits"], garment: "robe", pattern: "linen",
    colors: [["Navy", "#22324F"], ["Ivory", "#EFE6D2"]], sizes: ["M", "L", "XL"], price: 160, discount: 0, fee: 10, stock: 6, sold: 27, days: 6,
    description: "A flowing agbada with matching inner tunic and trousers, embroidered at the neck and pocket. Made for weddings and big days." },

  { slug: "kitenge-shift-dress", seller: "westlands", name: "Kitenge Shift Dress", category: "Women", sub: ["Dresses"], garment: "dress", pattern: "wax",
    colors: [["Saffron", "#E3A21A"], ["Emerald", "#1B7F5B"]], sizes: ADULT, price: 55, discount: 0, fee: 5, stock: 14, sold: 109, days: 38,
    description: "A clean-lined kitenge shift with cap sleeves and a concealed back zip. Office to evening without a change." },
  { slug: "shuka-check-bomber", seller: "westlands", name: "Shuka Check Bomber", category: "Men", sub: ["Jackets"], garment: "jacket", pattern: "check",
    colors: [["Red", "#C0392B"], ["Blue", "#2C5AA0"]], sizes: ADULT, price: 85, discount: 15, fee: 6, stock: 9, sold: 71, days: 24,
    description: "A bomber jacket cut from a bold shuka-style check, with ribbed cuffs and hem and a quilted lining for cool evenings." },
  { slug: "beaded-leather-tote", seller: "westlands", name: "Beaded Leather Tote", category: "Accessories", sub: ["Bags"], garment: "bag", pattern: "beads",
    colors: [["Tan", "#B07A4A"], ["Black", "#2A2A2A"]], sizes: ONE, price: 58, discount: 0, fee: 5, stock: 11, sold: 64, days: 33,
    description: "A full-grain leather tote with a hand-beaded band. Fits a laptop; inner zip pocket; strong stitched handles." },
  { slug: "kikoi-beach-trousers", seller: "westlands", name: "Kikoi Beach Trousers", category: "Men", sub: ["Trousers"], garment: "trousers", pattern: "kikoi",
    colors: [["Ocean", "#2A7DA0"], ["Rust", "#B5502F"]], sizes: ADULT, price: 36, discount: 0, fee: 4, stock: 16, sold: 45, days: 12,
    description: "Drawstring trousers in a striped kikoi-style cotton. Light, quick-drying and roomy through the leg." },
  { slug: "kitenge-crop-top", seller: "westlands", name: "Kitenge Crop Top", category: "Women", sub: ["Tops"], garment: "top", pattern: "wax",
    colors: [["Saffron", "#E3A21A"], ["Plum", "#6B2D5C"]], sizes: ["S", "M", "L"], price: 28, discount: 0, fee: 3, stock: 15, sold: 38, days: 3,
    description: "A boxy crop top in kitenge print with dropped shoulders. Pairs with high-waist skirts and trousers." }
];

/**
 * Orders: [buyer, product slug, colour index, size, qty, status, days ago, payment].
 * The demo buyer (amara) has one of each step; the demo seller (osu) has
 * orders to pack, ship and deliver and a return waiting for a decision.
 */
export const ORDERS = [
  ["amara", "ankara-wrap-dress", 1, "M", 1, "pending", 1, "card"],
  ["amara", "kente-stripe-shirt", 0, "L", 1, "packed", 3, "cash"],
  ["amara", "kente-stole-scarf", 1, "One Size", 2, "shipped", 5, "card"],
  ["amara", "adinkra-print-tunic", 0, "L", 1, "delivered", 9, "cash"],
  ["amara", "gele-headwrap", 0, "One Size", 1, "delivered", 19, "card"],
  ["amara", "kente-wrap-skirt", 0, "S", 1, "return requested", 15, "card"],
  ["amara", "kitenge-shift-dress", 1, "M", 1, "return accepted", 33, "cash"],

  ["kofi", "kente-stripe-shirt", 1, "XL", 2, "pending", 0, "cash"],
  ["kofi", "linen-senator-suit", 0, "L", 1, "delivered", 22, "card"],
  ["kofi", "shuka-check-bomber", 0, "L", 1, "delivered", 41, "card"],
  ["zainab", "kente-wrap-skirt", 1, "M", 1, "pending", 2, "card"],
  ["zainab", "adire-kaftan-maxi", 0, "S/M", 1, "delivered", 17, "cash"],
  ["zainab", "gele-headwrap", 1, "One Size", 2, "delivered", 44, "card"],
  ["achieng", "kids-adinkra-shirt-shorts", 0, "4-5Y", 2, "packed", 4, "cash"],
  ["achieng", "kitenge-crop-top", 0, "S", 1, "shipped", 2, "card"],
  ["achieng", "beaded-leather-tote", 1, "One Size", 1, "delivered", 27, "card"],
  ["thabo", "kente-stole-scarf", 0, "One Size", 1, "delivered", 11, "cash"],
  ["thabo", "kikoi-beach-trousers", 0, "M", 2, "delivered", 25, "card"],
  ["thabo", "agbada-three-piece", 1, "XL", 1, "pending", 1, "card"],
  ["fatou", "ankara-wrap-dress", 0, "S", 1, "delivered", 13, "card"],
  ["fatou", "adinkra-print-tunic", 1, "M", 1, "shipped", 6, "cash"],
  ["fatou", "kids-ankara-party-dress", 0, "4-5Y", 1, "delivered", 36, "card"],
  ["james", "linen-senator-suit", 1, "XL", 1, "pending", 0, "cash"],
  ["james", "ankara-bucket-hat", 0, "One Size", 1, "delivered", 30, "cash"],
  ["james", "kente-stripe-shirt", 0, "M", 1, "delivered", 48, "card"],
  ["kofi", "kente-stole-scarf", 0, "One Size", 3, "delivered", 55, "card"],
  ["zainab", "kids-adinkra-shirt-shorts", 1, "2-3Y", 1, "delivered", 38, "cash"]
];

/** Reviews on delivered orders: [buyer, product slug, stars, text]. */
export const REVIEWS = [
  ["amara", "gele-headwrap", 5, "Held its shape all evening at my cousin's wedding. The champagne shimmer photographs beautifully."],
  ["kofi", "linen-senator-suit", 5, "Fits like it was made for me. The linen softens after one wash and the trousers sit well."],
  ["kofi", "shuka-check-bomber", 4, "Warm without being heavy, and the check is even louder in person. Sleeves run a touch long."],
  ["zainab", "adire-kaftan-maxi", 5, "So comfortable, and the pockets are deep enough for a phone. The indigo is rich."],
  ["zainab", "gele-headwrap", 4, "Good stiffness for a tall fan. I ordered two so my sister and I could match."],
  ["achieng", "beaded-leather-tote", 5, "The beadwork is neat and tight, and my laptop fits with room to spare."],
  ["thabo", "kente-stole-scarf", 5, "Bought it for graduation. Colours are bright, the fringe is well finished."],
  ["thabo", "kikoi-beach-trousers", 4, "Light and cool for the coast. The drawstring could be a little longer."],
  ["fatou", "ankara-wrap-dress", 5, "The wrap stays put and the print hasn't faded at all. Lovely flutter sleeves."],
  ["fatou", "kids-ankara-party-dress", 5, "My daughter wouldn't take it off. Sizing was spot on for a five-year-old."],
  ["james", "ankara-bucket-hat", 4, "Nice to have two looks in one. The brim is sturdier than I expected."],
  ["james", "kente-stripe-shirt", 5, "Great weight for hot days and the stripe lines up across the buttons. Ordering the green one next."],
  ["kofi", "kente-stole-scarf", 5, "Bought three for our family photo, all matched perfectly."],
  ["zainab", "kids-adinkra-shirt-shorts", 4, "Soft fabric and easy snaps. Runs slightly big, which is fine for a growing boy."]
];

/** The return waiting for the demo seller (on amara's skirt order). */
export const RETURN_REQUEST = {
  product: "kente-wrap-skirt",
  reason: "Size too small",
  details: "The waist ties close but the skirt sits higher than the size chart suggests. I'd like a refund to my card.",
  refund_to: "Original payment method",
  location_confirmation: "Pick up from my delivery address"
};

/** The return already settled (accepted). */
export const SETTLED_RETURN = {
  product: "kitenge-shift-dress",
  reason: "Colour different from photos",
  details: "The emerald is darker than on screen. Unworn, tags on.",
  refund_to: "Afriva wallet",
  location_confirmation: "Drop off at courier point"
};

/** Amara's cart: [product slug, colour index, size, qty]. */
export const CART = [
  ["beaded-leather-tote", 0, "One Size", 1],
  ["kids-ankara-party-dress", 1, "2-3Y", 1]
];

export const NEWSLETTER = [`kofi.asante@${DOMAIN}`, `fatou.diallo@${DOMAIN}`, `james.mwangi@${DOMAIN}`];
