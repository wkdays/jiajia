"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRecordService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let BookRecordService = class BookRecordService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.bookRecord.create({
            data: {
                ...dto,
                studyDate: dto.studyDate ? new Date(dto.studyDate) : undefined,
            },
        });
    }
    async findByBook(bookId) {
        return this.prisma.bookRecord.findMany({
            where: { bookId },
            include: {
                relations: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.bookRecord.delete({ where: { id } });
    }
};
exports.BookRecordService = BookRecordService;
exports.BookRecordService = BookRecordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookRecordService);
//# sourceMappingURL=book-record.service.js.map