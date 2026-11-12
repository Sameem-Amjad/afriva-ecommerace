/**
 * Afriva demo seed for the shared Supabase hub (schema `afriva`).
 *
 * Empties the afriva tables and buckets, then fills them: three sellers with
 * their brands, four categories, 17 products with the illustrations from
 * scripts/make-images.mjs, seven shoppers, 27 orders across every status,
 * reviews, a return waiting for the seller, a cart and a saved card.
 * Doubles as a reset (visitor sign-ups keep their login but lose their
 * Afriva profile, orders and uploads). Run supabase/hub/schema.sql first.
 *
 *   SUPABASE_URL=… SUPABASE_SERVICE_ROLE_KEY=… node scripts/seed-hub.mjs
 */
import fs from "node:fs";

import { createClient } from "@supabase/supabase-js";

import { BUYERS, CART, CATEGORIES, DOMAIN, NEWSLETTER, ORDERS, PASSWORD, PRODUCTS, RETURN_REQUEST, REVIEWS, SELLERS, SETTLED_RETURN } from "./hub-catalogue.mjs";

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_ || !KEY) {
  console.error("✗ set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const IMAGES = new URL("./seed-images/", import.meta.url).pathname;
const sb = createClient(URL_, KEY, { db: { schema: "afriva" }, auth: { autoRefreshToken: false, persistSession: false } });
const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;
const NOW = Date.now();
const ago = (days, hours = 0) => new Date(NOW - days * DAY - hours * HOUR).toISOString();
const must = (label, { data, error }) => {
  if (error) throw new Error(`${label}: ${error.message}`);
  return data;
};

// ---- 1. accounts ---------------------------------------------------------
const existing = new Map();
for (let page = 1; ; page++) {
  const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 1000 });
  if (error) throw error;
  for (const u of data.users) if (u.email?.endsWith(`@${DOMAIN}`)) existing.set(u.email, u);
  if (data.users.length < 1000) break;
}
const ids = {};
for (const person of [...SELLERS, ...BUYERS]) {
  const user_metadata = { app: "afriva", name: person.name };
  // Every sample account is shared by visitors: no delete, no password change.
  const app_metadata = { no_delete: true };
  const prior = existing.get(person.email);
  if (prior) {
    must(`update ${person.email}`, await sb.auth.admin.updateUserById(prior.id, {
      user_metadata,
      app_metadata: { ...prior.app_metadata, ...app_metadata },
      password: PASSWORD,
      email_confirm: true
    }));
    ids[person.key] = prior.id;
  } else {
    const data = must(`create ${person.email}`, await sb.auth.admin.createUser({ email: person.email, password: PASSWORD, email_confirm: true, user_metadata, app_metadata }));
    ids[person.key] = data.user.id;
  }
}
console.log(`✓ ${SELLERS.length + BUYERS.length} accounts`);

// ---- 2. empty the schema -------------------------------------------------
const TABLES = [
  ["return_requests", "id"], ["reviews", "review_id"], ["cart", "cart_id"], ["payment_methods", "id"], ["payment_history", "id"],
  ["orders", "order_id"], ["address", "id"], ["promocode", "id"], ["referby", "id"], ["subscribe_newsletter", "id"], ["email_otps", "id"],
  ["products", "id"], ["brands", "brand_id"], ["categories", "category_id"], ["users", "uid"], ["sellers", "id"]
];
for (const [table, pk] of TABLES) must(`clear ${table}`, await sb.from(table).delete().not(pk, "is", null));
console.log(`✓ cleared ${TABLES.length} tables`);

// ---- 3. storage ----------------------------------------------------------
const BUCKETS = ["afriva-product-images", "afriva-brand-images", "afriva-profile-images", "afriva-review-media", "afriva-return-media"];
async function listAll(bucket, prefix = "") {
  const files = [];
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await sb.storage.from(bucket).list(prefix, { limit: 1000, offset });
    if (error) throw new Error(`list ${bucket}/${prefix}: ${error.message}`);
    for (const item of data) {
      const path = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null) files.push(...(await listAll(bucket, path)));
      else files.push(path);
    }
    if (data.length < 1000) break;
  }
  return files;
}
let removed = 0;
for (const bucket of BUCKETS) {
  const files = await listAll(bucket);
  for (let i = 0; i < files.length; i += 100) {
    must(`empty ${bucket}`, await sb.storage.from(bucket).remove(files.slice(i, i + 100)));
  }
  removed += files.length;
}

const TYPES = { ".jpg": "image/jpeg", ".png": "image/png" };
async function upload(bucket, path, local) {
  for (let attempt = 1; ; attempt++) {
    const { error } = await sb.storage.from(bucket).upload(path, fs.readFileSync(IMAGES + local), { contentType: TYPES[local.slice(local.lastIndexOf("."))], upsert: true });
    if (!error) break;
    if (attempt >= 4) throw new Error(`upload ${bucket}/${path}: ${error.message}`);
    await new Promise((r) => setTimeout(r, 1500 * attempt)); // storage occasionally drops a request
  }
  return `${URL_}/storage/v1/object/public/${bucket}/${path}`;
}
const img = {};
for (const p of PRODUCTS) {
  img[p.slug] = [];
  for (const n of [1, 2, 3]) img[p.slug].push(await upload("afriva-product-images", `seed/${p.slug}-${n}.jpg`, `products/${p.slug}-${n}.jpg`));
}
const catImg = {};
for (const c of CATEGORIES) catImg[c.name] = await upload("afriva-product-images", `seed/categories/${c.name.toLowerCase()}.jpg`, `categories/${c.name.toLowerCase()}.jpg`);
const chart = {};
for (const kind of ["adult", "kids", "one"]) chart[kind] = await upload("afriva-product-images", `seed/size-charts/${kind}.png`, `size-charts/${kind}.png`);
const logo = {};
for (const s of SELLERS) logo[s.key] = await upload("afriva-brand-images", `seed/${s.key}.png`, `brands/${s.key}.png`);
const avatar = {};
for (const b of BUYERS) avatar[b.key] = await upload("afriva-profile-images", `${ids[b.key]}/avatar.png`, `avatars/${b.key}.png`);
console.log(`✓ storage: ${removed} old files removed, ${PRODUCTS.length * 3 + CATEGORIES.length + 3 + SELLERS.length + BUYERS.length} uploaded`);

// ---- 4. sellers, brands, categories --------------------------------------
must("sellers", await sb.from("sellers").insert(SELLERS.map((s) => ({
  id: ids[s.key], email: s.email, name: s.name, brandname: s.brand, brandaddress: s.address, imageurl: logo[s.key], created_by: ids[s.key], created_at: ago(120)
}))));
const brandRows = must("brands", await sb.from("brands").insert(SELLERS.map((s) => ({
  name: s.brand, logo_url: logo[s.key], brandaddress: s.address, seller_id: ids[s.key], created_by: ids[s.key], created_at: ago(120)
}))).select("brand_id, seller_id"));
const brandOf = Object.fromEntries(brandRows.map((b) => [b.seller_id, b.brand_id]));
const catRows = must("categories", await sb.from("categories").insert(CATEGORIES.map((c, i) => ({
  category_name: c.name, category_image: catImg[c.name], subcategories: c.subcategories, created_at: ago(200 - i)
}))).select("category_id, category_name"));
const catOf = Object.fromEntries(catRows.map((c) => [c.category_name, c.category_id]));

// ---- 5. products ---------------------------------------------------------
const product = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
// Open (not returned) seeded orders take stock from their variant.
const takenFrom = {};
for (const [, slug, ci, size, qty, status] of ORDERS) {
  if (status.startsWith("return")) continue;
  const key = `${slug}|${ci}|${size}`;
  takenFrom[key] = (takenFrom[key] || 0) + qty;
}
const soldOut = new Set(["kitenge-crop-top|1|L"]); // one sold-out variant, as in a real shop
const productRows = must("products", await sb.from("products").insert(PRODUCTS.map((p) => {
  const size_details = p.colors.flatMap(([colorName, color], ci) => p.sizes.map((size) => {
    const key = `${p.slug}|${ci}|${size}`;
    const left = soldOut.has(key) ? 0 : Math.max(1, p.stock - (takenFrom[key] || 0) - ((ci + size.length) % 3));
    return { colorName, color, size, price: String(p.price), stock: String(p.stock), quantity: String(left), discount: String(p.discount), delivery_fee: String(p.fee) };
  }));
  const seededQty = ORDERS.filter((o) => o[1] === p.slug && !o[5].startsWith("return")).reduce((n, o) => n + o[4], 0);
  return {
    name: p.name,
    description: p.description,
    product_image: img[p.slug],
    size_chart: chart[p.category === "Kids" ? "kids" : p.category === "Accessories" ? "one" : "adult"],
    brand_id: brandOf[ids[p.seller]],
    category_id: catOf[p.category],
    seller_id: ids[p.seller],
    subcategory: p.sub,
    sizes: p.sizes,
    colors: p.colors.map(([name, hex]) => ({ name, hex })),
    size_details,
    price: p.price,
    discount: p.discount,
    total_number_of_sell: p.sold + seededQty,
    is_sample: true,
    created_by: ids[p.seller],
    created_at: ago(p.days)
  };
})).select("id, name"));
const pid = Object.fromEntries(productRows.map((r) => [PRODUCTS.find((p) => p.name === r.name).slug, r.id]));
console.log(`✓ ${productRows.length} products`);

// ---- 6. shoppers ---------------------------------------------------------
must("users", await sb.from("users").insert(BUYERS.map((b) => ({
  uid: ids[b.key], authid: ids[b.key], name: b.name, username: b.name.split(" ")[0].toLowerCase(), email: b.email,
  profile_image: avatar[b.key], phonenumber: b.phone, address: `${b.address}, ${b.city}`, country: b.country,
  full_address: { address: b.address, city: b.city, country: b.country }, accounttype: "buyer", provider: "email",
  favorite_products: b.key === "amara" ? [pid["kente-stole-scarf"], pid["adire-kaftan-maxi"], pid["beaded-leather-tote"]] : [],
  isactive: true, createdby: ids[b.key], updatedby: ids[b.key], createdat: ago(90), updatedat: ago(2)
}))));
const addrRows = must("address", await sb.from("address").insert(BUYERS.map((b) => ({
  user_id: ids[b.key], name: b.name, address: b.address, city: b.city, country: b.country, phone_number: b.phone, is_primary: true, created_at: ago(90)
}))).select("*"));
const addrOf = Object.fromEntries(addrRows.map((a) => [a.user_id, a]));

// ---- 7. orders -----------------------------------------------------------
let rnd = 7;
const nextRand = () => (rnd = (rnd * 1103515245 + 12345) % 2147483648) / 2147483648;
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const orderId = () => "AF-" + Array.from({ length: 8 }, () => CHARS[Math.floor(nextRand() * CHARS.length)]).join("");
const STEP = ["pending", "packed", "shipped", "delivered"];
const reached = (status, step) => {
  if (status === "completed" || status.startsWith("return")) return true;
  return STEP.indexOf(status) >= STEP.indexOf(step);
};
const capped = (t) => new Date(Math.min(t, NOW - HOUR)).toISOString();
const orderRows = ORDERS.map(([buyer, slug, ci, size, qty, status, days, payment]) => {
  const p = product[slug];
  const [colorName, color] = p.colors[ci];
  const created = NOW - days * DAY - 3 * HOUR;
  const subtotal = p.price * qty;
  const total = Math.round((subtotal * (1 - p.discount / 100) + p.fee) * 100) / 100;
  const a = addrOf[ids[buyer]];
  return {
    order_id: orderId(),
    product_ids: [pid[slug]],
    quantity: qty,
    status,
    payment_method: payment,
    user_delivery_address: { id: a.id, user_id: a.user_id, name: a.name, address: a.address, city: a.city, country: a.country, phone_number: a.phone_number, created_at: a.created_at },
    selected_size_details: { qty, size, color: colorName, color_code: color },
    subtotal, delivery_charge: p.fee, total, total_amount: total,
    packing_date: reached(status, "packed") ? capped(created + 0.8 * DAY) : null,
    shipping_date: reached(status, "shipped") ? capped(created + 1.9 * DAY) : null,
    delivery_date: reached(status, "delivered") ? capped(created + 4.2 * DAY) : null,
    created_by: ids[buyer],
    created_at: new Date(created).toISOString(),
    updated_at: capped(created + (status === "pending" ? 0 : 4.2) * DAY)
  };
});
must("orders", await sb.from("orders").insert(orderRows));
const orderFor = (buyer, slug, statuses) => orderRows.find((o) => o.created_by === ids[buyer] && o.product_ids[0] === pid[slug] && statuses.includes(o.status));
console.log(`✓ ${orderRows.length} orders`);

// ---- 8. returns, reviews, ratings ----------------------------------------
const pending = orderFor("amara", RETURN_REQUEST.product, ["return requested"]);
const settled = orderFor("amara", SETTLED_RETURN.product, ["return accepted"]);
must("returns", await sb.from("return_requests").insert([
  { order_id: pending.order_id, quantity: pending.quantity, reason: RETURN_REQUEST.reason, details: RETURN_REQUEST.details, refund_to: RETURN_REQUEST.refund_to,
    location_confirmation: RETURN_REQUEST.location_confirmation, refund_amount: pending.total, images: [img[RETURN_REQUEST.product][0]], confirm_return: false,
    created_by: ids.amara, created_at: ago(9) },
  { order_id: settled.order_id, quantity: settled.quantity, reason: SETTLED_RETURN.reason, details: SETTLED_RETURN.details, refund_to: SETTLED_RETURN.refund_to,
    location_confirmation: SETTLED_RETURN.location_confirmation, refund_amount: settled.total, images: [img[SETTLED_RETURN.product][1]], confirm_return: true,
    created_by: ids.amara, created_at: ago(27) }
]));

const reviewRows = REVIEWS.map(([buyer, slug, stars, text]) => {
  const o = orderFor(buyer, slug, ["delivered", "completed"]);
  if (!o) throw new Error(`review ${buyer}/${slug}: no delivered order`);
  return {
    product_id: pid[slug], order_id: o.order_id, review_by: ids[buyer], created_by: ids[buyer],
    reviewer_name: BUYERS.find((b) => b.key === buyer).name, description: text, total_score: stars, review_images: [],
    created_at: capped(new Date(o.delivery_date).getTime() + 2 * DAY)
  };
});
must("reviews", await sb.from("reviews").insert(reviewRows));
for (const p of PRODUCTS) must(`rating ${p.slug}`, await sb.rpc("refresh_rating", { p_product: pid[p.slug] }));
console.log(`✓ ${reviewRows.length} reviews, 2 returns`);

// ---- 9. amara's cart, card and payments; newsletter ------------------------
must("cart", await sb.from("cart").insert(CART.map(([slug, ci, size, qty], i) => ({
  user_id: ids.amara, product_id: pid[slug], quantity: qty, selected_size: size, selected_color: product[slug].colors[ci][1].replace("#", ""),
  created_by: ids.amara, updated_by: ids.amara, created_at: ago(0, 5 - i)
}))));
must("card", await sb.from("payment_methods").insert({
  created_by: ids.amara, card_holder_name: "Amara Okafor", type: "Visa", card_no: "************4242", expiry: "08/29", cvc: null, isPrimary: true, created_at: ago(60)
}));
must("payments", await sb.from("payment_history").insert(orderRows.filter((o) => o.created_by === ids.amara && o.payment_method === "card").map((o) => ({
  amount: o.total, type: "card", created_by: ids.amara, created_at: o.created_at
}))));
must("newsletter", await sb.from("subscribe_newsletter").insert(NEWSLETTER.map((email, i) => ({ email, created_at: ago(20 + i * 7) }))));

console.log(`✓ Afriva demo seeded. Logins (password ${PASSWORD}): ${BUYERS[0].email} (store), ${SELLERS[0].email} (seller dashboard)`);
