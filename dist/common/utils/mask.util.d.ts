export declare class MaskUtil {
    static maskPrice(price: string | number): string;
    static maskEmail(email: string): string;
    static maskPhone(phone: string): string;
    static maskGeneric(text: string, visibleStart?: number, visibleEnd?: number): string;
}
