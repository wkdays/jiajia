export declare class EncryptionUtil {
    private static readonly algorithm;
    private static readonly keyLength;
    private static readonly ivLength;
    private static readonly authTagLength;
    static encrypt(plaintext: string, secretKey: string): string;
    static decrypt(ciphertext: string, secretKey: string): string;
}
