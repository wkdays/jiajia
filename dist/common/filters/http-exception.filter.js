"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const error_codes_1 = require("../constants/error-codes");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const errorResponse = {
            code: this.mapStatusToErrorCode(status),
            message: exceptionResponse.message || exception.message,
            errors: Array.isArray(exceptionResponse.message) ? exceptionResponse.message.map((msg) => ({ message: msg })) : undefined,
            timestamp: new Date().toISOString(),
        };
        response.status(status).json(errorResponse);
    }
    mapStatusToErrorCode(status) {
        switch (status) {
            case 400: return error_codes_1.ErrorCode.BAD_REQUEST;
            case 401: return error_codes_1.ErrorCode.UNAUTHORIZED;
            case 403: return error_codes_1.ErrorCode.FORBIDDEN;
            case 404: return error_codes_1.ErrorCode.NOT_FOUND;
            case 409: return error_codes_1.ErrorCode.CONFLICT;
            case 429: return error_codes_1.ErrorCode.TOO_MANY_REQUESTS;
            case 500: return error_codes_1.ErrorCode.INTERNAL_ERROR;
            default: return error_codes_1.ErrorCode.INTERNAL_ERROR;
        }
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map