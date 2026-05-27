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
exports.MaterialController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const material_base_service_1 = require("./sub-services/material-base.service");
const material_supplier_service_1 = require("./sub-services/material-supplier.service");
const material_effect_service_1 = require("./sub-services/material-effect.service");
const material_clinic_service_1 = require("./sub-services/material-clinic.service");
const material_patent_service_1 = require("./sub-services/material-patent.service");
const material_safety_service_1 = require("./sub-services/material-safety.service");
const material_dto_1 = require("./dto/material.dto");
let MaterialController = class MaterialController {
    baseService;
    supplierService;
    effectService;
    clinicService;
    patentService;
    safetyService;
    constructor(baseService, supplierService, effectService, clinicService, patentService, safetyService) {
        this.baseService = baseService;
        this.supplierService = supplierService;
        this.effectService = effectService;
        this.clinicService = clinicService;
        this.patentService = patentService;
        this.safetyService = safetyService;
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
    createSupplier(materialId, dto) {
        return this.supplierService.create({ ...dto, materialId });
    }
    findSuppliers(materialId) {
        return this.supplierService.findByMaterial(materialId);
    }
    createEffect(materialId, dto) {
        return this.effectService.create({ ...dto, materialId });
    }
    findEffects(materialId) {
        return this.effectService.findByMaterial(materialId);
    }
    createClinic(materialId, dto) {
        return this.clinicService.create({ ...dto, materialId });
    }
    findClinics(materialId) {
        return this.clinicService.findByMaterial(materialId);
    }
    createPatent(materialId, dto) {
        return this.patentService.create({ ...dto, materialId });
    }
    findPatents(materialId) {
        return this.patentService.findByMaterial(materialId);
    }
    createSafety(materialId, dto) {
        return this.safetyService.create({ ...dto, materialId });
    }
    findSafety(materialId) {
        return this.safetyService.findByMaterial(materialId);
    }
};
exports.MaterialController = MaterialController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create material' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [material_dto_1.CreateMaterialBaseDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List materials with pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [material_dto_1.QueryMaterialDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get material detail' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, material_dto_1.UpdateMaterialBaseDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/suppliers'),
    (0, swagger_1.ApiOperation)({ summary: 'Add supplier to material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, material_dto_1.CreateMaterialSupplierDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "createSupplier", null);
__decorate([
    (0, common_1.Get)(':id/suppliers'),
    (0, swagger_1.ApiOperation)({ summary: 'List suppliers for material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findSuppliers", null);
__decorate([
    (0, common_1.Post)(':id/effects'),
    (0, swagger_1.ApiOperation)({ summary: 'Add effect to material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, material_dto_1.CreateMaterialEffectDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "createEffect", null);
__decorate([
    (0, common_1.Get)(':id/effects'),
    (0, swagger_1.ApiOperation)({ summary: 'List effects for material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findEffects", null);
__decorate([
    (0, common_1.Post)(':id/clinics'),
    (0, swagger_1.ApiOperation)({ summary: 'Add clinic data to material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, material_dto_1.CreateMaterialClinicDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "createClinic", null);
__decorate([
    (0, common_1.Get)(':id/clinics'),
    (0, swagger_1.ApiOperation)({ summary: 'List clinic data for material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findClinics", null);
__decorate([
    (0, common_1.Post)(':id/patents'),
    (0, swagger_1.ApiOperation)({ summary: 'Add patent to material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, material_dto_1.CreateMaterialPatentDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "createPatent", null);
__decorate([
    (0, common_1.Get)(':id/patents'),
    (0, swagger_1.ApiOperation)({ summary: 'List patents for material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findPatents", null);
__decorate([
    (0, common_1.Post)(':id/safety'),
    (0, swagger_1.ApiOperation)({ summary: 'Add safety data to material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, material_dto_1.CreateMaterialSafetyDto]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "createSafety", null);
__decorate([
    (0, common_1.Get)(':id/safety'),
    (0, swagger_1.ApiOperation)({ summary: 'List safety data for material' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "findSafety", null);
exports.MaterialController = MaterialController = __decorate([
    (0, swagger_1.ApiTags)('Materials'),
    (0, common_1.Controller)('materials'),
    __metadata("design:paramtypes", [material_base_service_1.MaterialBaseService,
        material_supplier_service_1.MaterialSupplierService,
        material_effect_service_1.MaterialEffectService,
        material_clinic_service_1.MaterialClinicService,
        material_patent_service_1.MaterialPatentService,
        material_safety_service_1.MaterialSafetyService])
], MaterialController);
//# sourceMappingURL=material.controller.js.map