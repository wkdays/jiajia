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
exports.ExportImportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const export_service_1 = require("./export.service");
const import_service_1 = require("./import.service");
const export_import_dto_1 = require("./dto/export-import.dto");
let ExportImportController = class ExportImportController {
    exportService;
    importService;
    constructor(exportService, importService) {
        this.exportService = exportService;
        this.importService = importService;
    }
    async exportEntity(entity, dto, res) {
        const result = await this.exportService.exportToCsv(entity, dto.ids);
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        res.send(result.content);
    }
    async exportFormulaReport(id, res) {
        const result = await this.exportService.exportFormulaReport(id);
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        res.send(result.content);
    }
    async exportSuppliers(materialId, mask, res) {
        const result = await this.exportService.exportSuppliers(materialId, mask === 'true');
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        res.send(result.content);
    }
    async importEntity(entity, csvContent) {
        return this.importService.importFromCsv(entity, csvContent);
    }
};
exports.ExportImportController = ExportImportController;
__decorate([
    (0, common_1.Get)('export/:entity'),
    (0, swagger_1.ApiOperation)({ summary: 'Export entity data to CSV' }),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, export_import_dto_1.ExportDto, Object]),
    __metadata("design:returntype", Promise)
], ExportImportController.prototype, "exportEntity", null);
__decorate([
    (0, common_1.Get)('export/formula/:id/report'),
    (0, swagger_1.ApiOperation)({ summary: 'Export formula report as HTML' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExportImportController.prototype, "exportFormulaReport", null);
__decorate([
    (0, common_1.Get)('export/materials/:id/suppliers'),
    (0, swagger_1.ApiOperation)({ summary: 'Export material suppliers with optional price masking' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('mask')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], ExportImportController.prototype, "exportSuppliers", null);
__decorate([
    (0, common_1.Post)('import/:entity'),
    (0, swagger_1.ApiOperation)({ summary: 'Import entity data from CSV' }),
    (0, swagger_1.ApiConsumes)('text/csv'),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Body)('csvContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExportImportController.prototype, "importEntity", null);
exports.ExportImportController = ExportImportController = __decorate([
    (0, swagger_1.ApiTags)('Export / Import'),
    (0, common_1.Controller)('export-import'),
    __metadata("design:paramtypes", [export_service_1.ExportService,
        import_service_1.ImportService])
], ExportImportController);
//# sourceMappingURL=export-import.controller.js.map