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
exports.MaterialBaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let MaterialBaseService = class MaterialBaseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.materialBase.create({
            data: {
                name: dto.name,
                alias: dto.alias,
                type: dto.type,
                intro: dto.intro,
                source: dto.source,
            },
        });
    }
    async findAll(query) {
        const { page = 1, pageSize = 20, search, type } = query;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { alias: { contains: search } },
            ];
        }
        if (type) {
            where.type = type;
        }
        const [items, total] = await Promise.all([
            this.prisma.materialBase.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { id: 'desc' },
                include: {
                    suppliers: true,
                    effects: true,
                    safety: true,
                },
            }),
            this.prisma.materialBase.count({ where }),
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
        const material = await this.prisma.materialBase.findUnique({
            where: { id },
            include: {
                suppliers: true,
                effects: true,
                clinics: true,
                patents: true,
                safety: true,
                healthLinks: {
                    include: {
                        health: true,
                    },
                },
            },
        });
        if (!material) {
            throw new common_1.NotFoundException(`Material with ID ${id} not found`);
        }
        return material;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.materialBase.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.materialBase.delete({ where: { id } });
    }
    async removeBatch(ids) {
        if (!ids || ids.length === 0) {
            return { deleted: 0 };
        }
        const result = await this.prisma.materialBase.deleteMany({
            where: { id: { in: ids } },
        });
        return { deleted: result.count };
    }
};
exports.MaterialBaseService = MaterialBaseService;
exports.MaterialBaseService = MaterialBaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaterialBaseService);
//# sourceMappingURL=material-base.service.js.map