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
exports.HealthBaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let HealthBaseService = class HealthBaseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.healthBase.create({ data: dto });
    }
    async findAll(query) {
        const { page = 1, pageSize = 20, search, type } = query;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { symptom: { contains: search } },
            ];
        }
        if (type) {
            where.type = type;
        }
        const [items, total] = await Promise.all([
            this.prisma.healthBase.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { id: 'desc' },
                include: {
                    mechanisms: true,
                    causes: true,
                    materialLinks: {
                        include: {
                            material: {
                                select: { id: true, name: true, alias: true },
                            },
                        },
                    },
                },
            }),
            this.prisma.healthBase.count({ where }),
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
        const health = await this.prisma.healthBase.findUnique({
            where: { id },
            include: {
                mechanisms: true,
                causes: true,
                materialLinks: {
                    include: {
                        material: true,
                    },
                },
                formulas: true,
            },
        });
        if (!health) {
            throw new common_1.NotFoundException(`Health problem with ID ${id} not found`);
        }
        return health;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.healthBase.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.healthBase.delete({ where: { id } });
    }
};
exports.HealthBaseService = HealthBaseService;
exports.HealthBaseService = HealthBaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HealthBaseService);
//# sourceMappingURL=health-base.service.js.map