"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskUtil = void 0;
class MaskUtil {
    static maskPrice(price) {
        const priceStr = String(price);
        if (priceStr.length <= 3)
            return '***';
        return priceStr.substring(0, 2) + '****' + priceStr.substring(priceStr.length - 1);
    }
    static maskEmail(email) {
        const [local, domain] = email.split('@');
        if (!domain)
            return email;
        const maskedLocal = local.substring(0, 2) + '****';
        return `${maskedLocal}@${domain}`;
    }
    static maskPhone(phone) {
        if (phone.length <= 7)
            return '****' + phone.substring(phone.length - 3);
        return phone.substring(0, 3) + '****' + phone.substring(phone.length - 4);
    }
    static maskGeneric(text, visibleStart = 2, visibleEnd = 2) {
        if (text.length <= visibleStart + visibleEnd)
            return '*'.repeat(text.length);
        return text.substring(0, visibleStart) + '*'.repeat(text.length - visibleStart - visibleEnd) + text.substring(text.length - visibleEnd);
    }
}
exports.MaskUtil = MaskUtil;
//# sourceMappingURL=mask.util.js.map