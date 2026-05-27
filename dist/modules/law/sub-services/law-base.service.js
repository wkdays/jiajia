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
exports.LawBaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let LawBaseService = class LawBaseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.lawBase.create({
            data: {
                ...dto,
                effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate) : undefined,
            },
        });
    }
    async findAll(query) {
        const { page = 1, pageSize = 20, search, country } = query;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (search) {
            where.name = { contains: search };
        }
        if (country) {
            where.country = country;
        }
        const [items, total] = await Promise.all([
            this.prisma.lawBase.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { id: 'desc' },
                include: {
                    materialLinks: true,
                },
            }),
            this.prisma.lawBase.count({ where }),
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
        const law = await this.prisma.lawBase.findUnique({
            where: { id },
            include: {
                materialLinks: {
                    include: {
                        material: {
                            select: { id: true, name: true },
                        },
                    },
                },
                updates: true,
            },
        });
        if (!law) {
            throw new common_1.NotFoundException(`Law with ID ${id} not found`);
        }
        return law;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.lawBase.update({
            where: { id },
            data: {
                ...dto,
                effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate) : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.lawBase.delete({ where: { id } });
    }
};
exports.LawBaseService = LawBaseService;
exports.LawBaseService = LawBaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LawBaseService);
//# sourceMappingURL=law-base.service.js.map