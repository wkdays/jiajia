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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const backup_service_1 = require("./backup.service");
const admin_dto_1 = require("./dto/admin.dto");
const require_roles_decorator_1 = require("../../common/decorators/require-roles.decorator");
const roles_1 = require("../../common/constants/roles");
let AdminController = class AdminController {
    adminService;
    backupService;
    constructor(adminService, backupService) {
        this.adminService = adminService;
        this.backupService = backupService;
    }
    findAllUsers(query) {
        return this.adminService.findAllUsers(query);
    }
    findUserById(id) {
        return this.adminService.findUserById(id);
    }
    updateUserRole(id, dto) {
        return this.adminService.updateUserRole(id, dto);
    }
    getSystemStats() {
        return this.adminService.getSystemStats();
    }
    getAuditLogs(query) {
        return this.adminService.getAuditLogs(query);
    }
    async createBackup(res) {
        const result = await this.backupService.createBackup();
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        res.send(result.content);
    }
    async restoreFromBackup(backupContent) {
        return this.backupService.restoreFromBackup(backupContent);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'List all users (admin only)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.QueryUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user detail (admin only)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findUserById", null);
__decorate([
    (0, common_1.Put)('users/:id/role'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user role (admin only)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get system statistics (admin only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getSystemStats", null);
__decorate([
    (0, common_1.Get)('audit-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get audit logs (admin only)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)('backup'),
    (0, swagger_1.ApiOperation)({ summary: 'Create full system backup (admin only)' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createBackup", null);
__decorate([
    (0, common_1.Post)('restore'),
    (0, swagger_1.ApiOperation)({ summary: 'Preview restore from backup (admin only)' }),
    __param(0, (0, common_1.Body)('backupContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "restoreFromBackup", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('admin'),
    (0, require_roles_decorator_1.RequireRoles)(roles_1.Role.ADMIN),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        backup_service_1.BackupService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map