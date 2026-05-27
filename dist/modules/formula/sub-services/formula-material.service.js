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
exports.FormulaMaterialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let FormulaMaterialService = class FormulaMaterialService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.formulaMaterial.create({ data: dto });
    }
    async findByFormula(formulaId) {
        return this.prisma.formulaMaterial.findMany({
            where: { formulaId },
            include: {
                material: {
                    select: { id: true, name: true, alias: true },
                },
            },
        });
    }
    async updateDosage(id, dosage, dosageLogic) {
        return this.prisma.formulaMaterial.update({
            where: { id },
            data: { dosage, dosageLogic },
        });
    }
    async remove(id) {
        return this.prisma.formulaMaterial.delete({ where: { id } });
    }
};
exports.FormulaMaterialService = FormulaMaterialService;
exports.FormulaMaterialService = FormulaMaterialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FormulaMaterialService);
//# sourceMappingURL=formula-material.service.js.map