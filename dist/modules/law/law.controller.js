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
exports.LawController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const law_base_service_1 = require("./sub-services/law-base.service");
const law_material_service_1 = require("./sub-services/law-material.service");
const law_update_service_1 = require("./sub-services/law-update.service");
const law_dto_1 = require("./dto/law.dto");
let LawController = class LawController {
    baseService;
    materialService;
    updateService;
    constructor(baseService, materialService, updateService) {
        this.baseService = baseService;
        this.materialService = materialService;
        this.updateService = updateService;
    }
    create(dto) {
        return this.baseService.create(dto);
    }
    findAll(query) {
        return this.baseService.findAll(query);
    }
    findOne(id) {
        return this.baseService.findOne(id);
    }
    update(id, dto) {
        return this.baseService.update(id, dto);
    }
    remove(id) {
        return this.baseService.remove(id);
    }
    createLawMaterial(lawId, dto) {
        return this.materialService.create({ ...dto, lawId });
    }
    findLawMaterials(lawId) {
        return this.materialService.findByLaw(lawId);
    }
    createLawUpdate(lawId, dto) {
        return this.updateService.create({ ...dto, lawId });
    }
    findLawUpdates(lawId) {
        return this.updateService.findByLaw(lawId);
    }
};
exports.LawController = LawController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create law' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [law_dto_1.CreateLawBaseDto]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List laws with pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [law_dto_1.QueryLawDto]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get law detail' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update law' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, law_dto_1.UpdateLawBaseDto]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete law' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/materials'),
    (0, swagger_1.ApiOperation)({ summary: 'Add material compliance to law' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, law_dto_1.CreateLawMaterialDto]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "createLawMaterial", null);
__decorate([
    (0, common_1.Get)(':id/materials'),
    (0, swagger_1.ApiOperation)({ summary: 'List material compliance for law' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "findLawMaterials", null);
__decorate([
    (0, common_1.Post)(':id/updates'),
    (0, swagger_1.ApiOperation)({ summary: 'Add update to law' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, law_dto_1.CreateLawUpdateDto]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "createLawUpdate", null);
__decorate([
    (0, common_1.Get)(':id/updates'),
    (0, swagger_1.ApiOperation)({ summary: 'List updates for law' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LawController.prototype, "findLawUpdates", null);
exports.LawController = LawController = __decorate([
    (0, swagger_1.ApiTags)('Laws'),
    (0, common_1.Controller)('laws'),
    __metadata("design:paramtypes", [law_base_service_1.LawBaseService,
        law_material_service_1.LawMaterialService,
        law_update_service_1.LawUpdateService])
], LawController);
//# sourceMappingURL=law.controller.js.map