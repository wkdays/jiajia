"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionUtil = void 0;
const crypto_1 = require("crypto");
class EncryptionUtil {
    static algorithm = 'aes-256-gcm';
    static keyLength = 32;
    static ivLength = 16;
    static authTagLength = 16;
    static encrypt(plaintext, secretKey) {
        const key = (0, crypto_1.scryptSync)(secretKey, 'salt', this.keyLength);
        const iv = (0, crypto_1.randomBytes)(this.ivLength);
        const cipher = (0, crypto_1.createCipheriv)(this.algorithm, key, iv);
        let encrypted = cipher.update(plaintext, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
    }
    static decrypt(ciphertext, secretKey) {
        const key = (0, crypto_1.scryptSync)(secretKey, 'salt', this.keyLength);
        const parts = ciphertext.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted format');
        }
        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encrypted = parts[2];
        const decipher = (0, crypto_1.createDecipheriv)(this.algorithm, key, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
exports.EncryptionUtil = EncryptionUtil;
//# sourceMappingURL=encryption.util.js.map