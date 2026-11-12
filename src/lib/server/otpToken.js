import crypto from "crypto";

/**
 * A short-lived proof that an email code was verified, so the next step
 * (setting a new password) can't be called for an address nobody verified.
 */
const secret = () => {
    const s = process.env.OTP_SECRET;
    if (!s || s.length < 32) throw new Error("OTP_SECRET must be at least 32 characters");
    return s;
};

const sign = (body) => crypto.createHmac("sha256", secret()).update(body).digest("base64url");

export function makeToken(email, purpose, minutes = 15) {
    const body = Buffer.from(JSON.stringify({ e: email.toLowerCase(), p: purpose, x: Date.now() + minutes * 60000 })).toString("base64url");
    return `${body}.${sign(body)}`;
}

/** The verified email for this purpose, or null. */
export function readToken(token, purpose) {
    if (typeof token !== "string" || !token.includes(".")) return null;
    const [body, mac] = token.split(".");
    const expected = sign(body);
    if (!mac || mac.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
    try {
        const { e, p, x } = JSON.parse(Buffer.from(body, "base64url").toString());
        return p === purpose && Date.now() < x ? e : null;
    } catch {
        return null;
    }
}
