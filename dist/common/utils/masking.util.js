"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskingService = void 0;
const common_1 = require("@nestjs/common");
let MaskingService = class MaskingService {
    maskPrice(price) {
        const priceStr = price.toString();
        if (priceStr.length <= 2)
            return '***';
        return priceStr.slice(0, 2) + '***' + priceStr.slice(-2);
    }
    maskEmail(email) {
        const [local, domain] = email.split('@');
        if (!local || !domain)
            return email;
        const maskedLocal = local.length > 2
            ? local.slice(0, 2) + '***' + local.slice(-1)
            : '***';
        return `${maskedLocal}@${domain}`;
    }
    maskPhone(phone) {
        if (phone.length < 7)
            return '***';
        return phone.slice(0, 3) + '****' + phone.slice(-4);
    }
    maskGeneric(value, visibleChars = 2) {
        if (value.length <= visibleChars * 2)
            return '***';
        return value.slice(0, visibleChars) + '***' + value.slice(-visibleChars);
    }
};
exports.MaskingService = MaskingService;
exports.MaskingService = MaskingService = __decorate([
    (0, common_1.Injectable)()
], MaskingService);
//# sourceMappingURL=masking.util.js.map