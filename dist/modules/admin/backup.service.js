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
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BackupService = class BackupService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBackup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const [users, materials, healthProblems, formulas, laws, books, auditLogs,] = await Promise.all([
            this.prisma.user.findMany(),
            this.prisma.materialBase.findMany(),
            this.prisma.healthBase.findMany(),
            this.prisma.formulaBase.findMany(),
            this.prisma.lawBase.findMany(),
            this.prisma.bookBase.findMany(),
            this.prisma.auditLog.findMany(),
        ]);
        const backup = {
            meta: {
                version: '1.0.0',
                timestamp: new Date().toISOString(),
                exportedBy: 'system',
            },
            data: {
                users,
                materials,
                healthProblems,
                formulas,
                laws,
                books,
                auditLogs,
            },
        };
        return {
            filename: `backup-${timestamp}.json`,
            content: JSON.stringify(backup, null, 2),
            contentType: 'application/json',
        };
    }
    async restoreFromBackup(backupContent) {
        const backup = JSON.parse(backupContent);
        if (!backup.data) {
            throw new Error('Invalid backup format');
        }
        const summary = {
            users: backup.data.users?.length || 0,
            materials: backup.data.materials?.length || 0,
            healthProblems: backup.data.healthProblems?.length || 0,
            formulas: backup.data.formulas?.length || 0,
            laws: backup.data.laws?.length || 0,
            books: backup.data.books?.length || 0,
            auditLogs: backup.data.auditLogs?.length || 0,
        };
        return {
            restored: summary,
            message: 'Backup parsed successfully. Use individual import endpoints for actual restore.',
        };
    }
};
exports.BackupService = BackupService;
exports.BackupService = BackupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BackupService);
//# sourceMappingURL=backup.service.js.map