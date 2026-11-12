/** @type {import('next').NextConfig} */
const nextConfig = {
    // Product photos come from Supabase storage and are already sized for the
    // web, so they are served as they are.
    images: { unoptimized: true },
};

export default nextConfig;
