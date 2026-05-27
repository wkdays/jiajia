export declare class MaskingService {
    maskPrice(price: string | number): string;
    maskEmail(email: string): string;
    maskPhone(phone: string): string;
    maskGeneric(value: string, visibleChars?: number): string;
}
