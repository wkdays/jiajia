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
exports.FormulaBaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let FormulaBaseService = class FormulaBaseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.formulaBase.create({
            data: dto,
            include: {
                health: {
                    select: { id: true, name: true },
                },
            },
        });
    }
    async findAll(query) {
        const { page = 1, pageSize = 20, name, healthId } = query;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (name) {
            where.name = { contains: name };
        }
        if (healthId) {
            where.healthId = healthId;
        }
        const [items, total] = await Promise.all([
            this.prisma.formulaBase.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { id: 'desc' },
                include: {
                    health: {
                        select: { id: true, name: true },
                    },
                    materials: {
                        include: {
                            material: {
                                select: { id: true, name: true },
                            },
                        },
                    },
                },
            }),
            this.prisma.formulaBase.count({ where }),
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
        const formula = await this.prisma.formulaBase.findUnique({
            where: { id },
            include: {
                health: true,
                materials: {
                    include: {
                        material: true,
                    },
                },
                logics: true,
            },
        });
        if (!formula) {
            throw new common_1.NotFoundException(`Formula with ID ${id} not found`);
        }
        return formula;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.formulaBase.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.formulaBase.delete({ where: { id } });
    }
};
exports.FormulaBaseService = FormulaBaseService;
exports.FormulaBaseService = FormulaBaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FormulaBaseService);
//# sourceMappingURL=formula-base.service.js.map