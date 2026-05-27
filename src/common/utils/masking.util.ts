import { Injectable } from '@nestjs/common';

@Injectable()
export class MaskingService {
  maskPrice(price: string | number): string {
    const priceStr = price.toString();
    if (priceStr.length <= 2) return '***';
    return priceStr.slice(0, 2) + '***' + priceStr.slice(-2);
  }

  maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const maskedLocal = local.length > 2 
      ? local.slice(0, 2) + '***' + local.slice(-1)
      : '***';
    return `${maskedLocal}@${domain}`;
  }

  maskPhone(phone: string): string {
    if (phone.length < 7) return '***';
    return phone.slice(0, 3) + '****' + phone.slice(-4);
  }

  maskGeneric(value: string, visibleChars: number = 2): string {
    if (value.length <= visibleChars * 2) return '***';
    return value.slice(0, visibleChars) + '***' + value.slice(-visibleChars);
  }
}
