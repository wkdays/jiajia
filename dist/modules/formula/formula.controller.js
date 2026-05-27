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
exports.FormulaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const formula_base_service_1 = require("./sub-services/formula-base.service");
const formula_material_service_1 = require("./sub-services/formula-material.service");
const formula_logic_service_1 = require("./sub-services/formula-logic.service");
const formula_generator_service_1 = require("./formula-generator.service");
const formula_dto_1 = require("./dto/formula.dto");
let FormulaController = class FormulaController {
    baseService;
    materialService;
    logicService;
    generatorService;
    constructor(baseService, materialService, logicService, generatorService) {
        this.baseService = baseService;
        this.materialService = materialService;
        this.logicService = logicService;
        this.generatorService = generatorService;
    }
    create(dto) {
        return this.baseService.create(dto);
    }
    generate(dto) {
        return this.generatorService.generate(dto);
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
    createFormulaMaterial(formulaId, dto) {
        return this.materialService.create({ ...dto, formulaId });
    }
    findFormulaMaterials(formulaId) {
        return this.materialService.findByFormula(formulaId);
    }
    updateDosage(materialId, dto) {
        return this.materialService.updateDosage(materialId, dto.dosage, dto.dosageLogic);
    }
    createFormulaLogic(formulaId, dto) {
        return this.logicService.create({ ...dto, formulaId });
    }
    findFormulaLogics(formulaId) {
        return this.logicService.findByFormula(formulaId);
    }
};
exports.FormulaController = FormulaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create formula manually' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [formula_dto_1.CreateFormulaBaseDto]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Auto-generate formula from health problem' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [formula_dto_1.GenerateFormulaDto]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List formulas with pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [formula_dto_1.QueryFormulaDto]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get formula detail' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update formula' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, formula_dto_1.UpdateFormulaBaseDto]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete formula' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/materials'),
    (0, swagger_1.ApiOperation)({ summary: 'Add material to formula' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, formula_dto_1.CreateFormulaMaterialDto]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "createFormulaMaterial", null);
__decorate([
    (0, common_1.Get)(':id/materials'),
    (0, swagger_1.ApiOperation)({ summary: 'List materials in formula' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "findFormulaMaterials", null);
__decorate([
    (0, common_1.Put)(':id/materials/:materialId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update material dosage in formula' }),
    __param(0, (0, common_1.Param)('materialId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "updateDosage", null);
__decorate([
    (0, common_1.Post)(':id/logics'),
    (0, swagger_1.ApiOperation)({ summary: 'Add logic to formula' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, formula_dto_1.CreateFormulaLogicDto]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "createFormulaLogic", null);
__decorate([
    (0, common_1.Get)(':id/logics'),
    (0, swagger_1.ApiOperation)({ summary: 'List logics for formula' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormulaController.prototype, "findFormulaLogics", null);
exports.FormulaController = FormulaController = __decorate([
    (0, swagger_1.ApiTags)('Formulas'),
    (0, common_1.Controller)('formulas'),
    __metadata("design:paramtypes", [formula_base_service_1.FormulaBaseService,
        formula_material_service_1.FormulaMaterialService,
        formula_logic_service_1.FormulaLogicService,
        formula_generator_service_1.FormulaGeneratorService])
], FormulaController);
//# sourceMappingURL=formula.controller.js.map