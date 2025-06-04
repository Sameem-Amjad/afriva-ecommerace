import crypto from 'crypto';

export const useEncryption = () => {
    const encrypt = (text, key, iv) => {
        if (!text || !key || !iv) {
            throw new Error("Missing required parameters for encryption.");
        }
        console.log("Encryption Key:", key.length, iv.length);
        if (key.length !== 64 || iv.length !== 32) {
            throw new Error("Invalid key or IV length. Key must be 64 characters and IV must be 32 characters.");
        }

        if (text.length === 0) {
            throw new Error("Text to encrypt cannot be empty.");
        }
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    };

    return { encrypt };
};