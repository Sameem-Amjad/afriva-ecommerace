import crypto from 'crypto';

export const encrypt = (text) => {
    const algorithm = 'aes-256-cbc';
    const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    const iv = process.env.NEXT_PUBLIC_ENCRYPTION_IV;

    if (!key || !iv) {
        throw new Error("Encryption key or IV is not defined in environment variables.");
    }

    if (key.length !== 64) {
        throw new Error("Encryption key must be 64 hex characters (32 bytes).");
    }

    if (iv.length !== 32) {
        throw new Error("Encryption IV must be 32 hex characters (16 bytes).");
    }

    const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(key, 'hex'),
        Buffer.from(iv, 'hex')
    );

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
};
