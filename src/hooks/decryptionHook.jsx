
import crypto from 'crypto';

export const useDecryption = () => {
    const decrypt = (encryptedText, key, iv) => {
        console.log("Decryption Key:", encryptedText, key, iv);
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    };

    return { decrypt };
};