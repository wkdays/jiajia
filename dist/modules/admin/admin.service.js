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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllUsers(query) {
        const { page = 1, pageSize = 20, search, role } = query;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { email: { contains: search } },
                { username: { contains: search } },
            ];
        }
        if (role) {
            where.role = role;
        }
        const [items, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { id: 'desc' },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.user.count({ where }),
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
    async findUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async updateUserRole(id, dto) {
        await this.findUserById(id);
        return this.prisma.user.update({
            where: { id },
            data: { role: dto.role },
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                role: true,
            },
        });
    }
    async getSystemStats() {
        const [userCount, materialCount, healthCount, formulaCount, lawCount, bookCount, auditLogCount,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.materialBase.count(),
            this.prisma.healthBase.count(),
            this.prisma.formulaBase.count(),
            this.prisma.lawBase.count(),
            this.prisma.bookBase.count(),
            this.prisma.auditLog.count(),
        ]);
        return {
            users: userCount,
            materials: materialCount,
            healthProblems: healthCount,
            formulas: formulaCount,
            laws: lawCount,
            books: bookCount,
            auditLogs: auditLogCount,
        };
    }
    async getAuditLogs(query) {
        const { page = 1, pageSize = 20, userId } = query;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (userId)
            where.userId = userId;
        const [items, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.auditLog.count({ where }),
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map