"use client";
import { DEMO_MODE } from "@/utils/demo";

/** A small, always-visible note that this storefront runs on sample data. */
export default function DemoBanner() {
    if (!DEMO_MODE) return null;
    return (
        <p
            role="note"
            className="pointer-events-none fixed bottom-3 left-3 z-[9999] rounded-full bg-black/85 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg"
        >
            Demo store · sample data · no real payments
        </p>
    );
}
