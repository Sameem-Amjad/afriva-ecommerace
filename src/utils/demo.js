/**
 * Demo mode: the storefront runs on sample data, with no payment provider and
 * no email service. Card payments are simulated (nothing is charged), sign-up
 * codes are shown on screen, and password reset by email is switched off.
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const DEMO_PASSWORD = "Afriva@2026";

/** The public demo login, shown on the login page in demo mode. */
export const DEMO_LOGINS = [
    { label: "Demo buyer", email: "amara.okafor@demo.afriva.shop", password: DEMO_PASSWORD },
];

/** Accounts visitors share: their password, email and existence are locked. */
export function isDemoAccount(user) {
    if (!user) return false;
    if (user?.app_metadata?.no_delete) return true;
    const email = (user?.email || "").toLowerCase();
    return email.endsWith("@demo.afriva.shop");
}

export const DEMO_ACCOUNT_LOCKED = "This is the shared demo account, so its password and account can't be changed.";
