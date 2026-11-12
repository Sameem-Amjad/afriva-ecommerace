import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// The demo runs on a shared Supabase project: Afriva's tables live in their
// own schema and its storage buckets carry an "afriva-" prefix.
export const SCHEMA = process.env.NEXT_PUBLIC_SUPABASE_DB_SCHEMA || 'public';

export const supabase = createClient(supabaseUrl, supabaseKey, { db: { schema: SCHEMA } });

const HUB_BUCKETS = {
    profile_images: 'afriva-profile-images',
    product_images: 'afriva-product-images',
    brand_images: 'afriva-brand-images',
    review_media: 'afriva-review-media',
    'return-orders-media': 'afriva-return-media',
};

export const bucket = (name) => (SCHEMA === 'afriva' ? HUB_BUCKETS[name] || name : name);
