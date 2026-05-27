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
exports.BookBaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let BookBaseService = class BookBaseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.bookBase.create({
            data: {
                ...dto,
                publishDate: dto.publishDate ? new Date(dto.publishDate) : undefined,
            },
        });
    }
    async findAll(query) {
        const { page = 1, pageSize = 20, name, author } = query;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (name) {
            where.name = { contains: name };
        }
        if (author) {
            where.author = author;
        }
        const [items, total] = await Promise.all([
            this.prisma.bookBase.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { id: 'desc' },
                include: {
                    records: true,
                },
            }),
            this.prisma.bookBase.count({ where }),
        ]);
        return {
            items,
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async findOne(id) {
        const book = await this.prisma.bookBase.findUnique({
            where: { id },
            include: {
                records: {
                    include: {
                        relations: true,
                    },
                },
            },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.bookBase.update({
            where: { id },
            data: {
                ...dto,
                publishDate: dto.publishDate ? new Date(dto.publishDate) : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.bookBase.delete({ where: { id } });
    }
};
exports.BookBaseService = BookBaseService;
exports.BookBaseService = BookBaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookBaseService);
//# sourceMappingURL=book-base.service.js.map