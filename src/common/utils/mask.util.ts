export class MaskUtil {
  static maskPrice(price: string | number): string {
    const priceStr = String(price);
    if (priceStr.length <= 3) return '***';
    return priceStr.substring(0, 2) + '****' + priceStr.substring(priceStr.length - 1);
  }

  static maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!domain) return email;
    const maskedLocal = local.substring(0, 2) + '****';
    return `${maskedLocal}@${domain}`;
  }

  static maskPhone(phone: string): string {
    if (phone.length <= 7) return '****' + phone.substring(phone.length - 3);
    return phone.substring(0, 3) + '****' + phone.substring(phone.length - 4);
  }

  static maskGeneric(text: string, visibleStart = 2, visibleEnd = 2): string {
    if (text.length <= visibleStart + visibleEnd) return '*'.repeat(text.length);
    return text.substring(0, visibleStart) + '*'.repeat(text.length - visibleStart - visibleEnd) + text.substring(text.length - visibleEnd);
  }
}
