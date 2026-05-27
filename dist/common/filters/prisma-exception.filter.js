"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const error_codes_1 = require("../constants/error-codes");
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = 500;
        let code = error_codes_1.ErrorCode.INTERNAL_ERROR;
        let message = 'Database error';
        switch (exception.code) {
            case 'P2002':
                status = 409;
                code = error_codes_1.ErrorCode.CONFLICT;
                message = `Unique constraint failed on field: ${exception.meta?.target}`;
                break;
            case 'P2025':
                status = 404;
                code = error_codes_1.ErrorCode.NOT_FOUND;
                message = 'Record not found';
                break;
            case 'P2003':
                status = 400;
                code = error_codes_1.ErrorCode.BAD_REQUEST;
                message = `Foreign key constraint failed on field: ${exception.meta?.field_name}`;
                break;
            default:
                message = exception.message;
        }
        response.status(status).json({
            code,
            message,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map