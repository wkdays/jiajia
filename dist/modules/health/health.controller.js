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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const health_base_service_1 = require("./sub-services/health-base.service");
const health_mechanism_service_1 = require("./sub-services/health-mechanism.service");
const health_cause_service_1 = require("./sub-services/health-cause.service");
const health_material_service_1 = require("./sub-services/health-material.service");
const health_dto_1 = require("./dto/health.dto");
let HealthController = class HealthController {
    baseService;
    mechanismService;
    causeService;
    materialService;
    constructor(baseService, mechanismService, causeService, materialService) {
        this.baseService = baseService;
        this.mechanismService = mechanismService;
        this.causeService = causeService;
        this.materialService = materialService;
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
    createMechanism(healthId, dto) {
        return this.mechanismService.create({ ...dto, healthId });
    }
    findMechanisms(healthId) {
        return this.mechanismService.findByHealth(healthId);
    }
    createCause(healthId, dto) {
        return this.causeService.create({ ...dto, healthId });
    }
    findCauses(healthId) {
        return this.causeService.findByHealth(healthId);
    }
    createHealthMaterial(healthId, dto) {
        return this.materialService.create({ ...dto, healthId });
    }
    findHealthMaterials(healthId) {
        return this.materialService.findByHealth(healthId);
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create health problem' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [health_dto_1.CreateHealthBaseDto]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List health problems with pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [health_dto_1.QueryHealthDto]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get health problem detail' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update health problem' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, health_dto_1.UpdateHealthBaseDto]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete health problem' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/mechanisms'),
    (0, swagger_1.ApiOperation)({ summary: 'Add mechanism to health problem' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, health_dto_1.CreateHealthMechanismDto]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "createMechanism", null);
__decorate([
    (0, common_1.Get)(':id/mechanisms'),
    (0, swagger_1.ApiOperation)({ summary: 'List mechanisms for health problem' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "findMechanisms", null);
__decorate([
    (0, common_1.Post)(':id/causes'),
    (0, swagger_1.ApiOperation)({ summary: 'Add cause to health problem' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, health_dto_1.CreateHealthCauseDto]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "createCause", null);
__decorate([
    (0, common_1.Get)(':id/causes'),
    (0, swagger_1.ApiOperation)({ summary: 'List causes for health problem' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "findCauses", null);
__decorate([
    (0, common_1.Post)(':id/materials'),
    (0, swagger_1.ApiOperation)({ summary: 'Link material to health problem' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, health_dto_1.CreateHealthMaterialDto]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "createHealthMaterial", null);
__decorate([
    (0, common_1.Get)(':id/materials'),
    (0, swagger_1.ApiOperation)({ summary: 'List linked materials for health problem' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "findHealthMaterials", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health Problems'),
    (0, common_1.Controller)('health-problems'),
    __metadata("design:paramtypes", [health_base_service_1.HealthBaseService,
        health_mechanism_service_1.HealthMechanismService,
        health_cause_service_1.HealthCauseService,
        health_material_service_1.HealthMaterialService])
], HealthController);
//# sourceMappingURL=health.controller.js.map