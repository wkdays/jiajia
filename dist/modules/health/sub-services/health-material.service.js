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
exports.HealthMaterialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let HealthMaterialService = class HealthMaterialService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const health = await this.prisma.healthBase.findUnique({ where: { id: dto.healthId } });
        const material = await this.prisma.materialBase.findUnique({ where: { id: dto.materialId } });
        if (!health) {
            throw new common_1.NotFoundException(`Health problem with ID ${dto.healthId} not found`);
        }
        if (!material) {
            throw new common_1.NotFoundException(`Material with ID ${dto.materialId} not found`);
        }
        return this.prisma.healthMaterial.create({
            data: {
                healthId: dto.healthId,
                materialId: dto.materialId,
                matchLogic: dto.matchLogic,
            },
        });
    }
    async findByHealth(healthId) {
        return this.prisma.healthMaterial.findMany({
            where: { healthId },
            include: {
                material: {
                    select: { id: true, name: true, alias: true, type: true },
                },
            },
        });
    }
    async findByMaterial(materialId) {
        return this.prisma.healthMaterial.findMany({
            where: { materialId },
            include: {
                health: {
                    select: { id: true, name: true, type: true },
                },
            },
        });
    }
    async remove(id) {
        return this.prisma.healthMaterial.delete({ where: { id } });
    }
};
exports.HealthMaterialService = HealthMaterialService;
exports.HealthMaterialService = HealthMaterialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HealthMaterialService);
//# sourceMappingURL=health-material.service.js.map