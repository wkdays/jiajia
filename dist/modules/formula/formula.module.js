"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaModule = void 0;
const common_1 = require("@nestjs/common");
const formula_controller_1 = require("./formula.controller");
const formula_base_service_1 = require("./sub-services/formula-base.service");
const formula_material_service_1 = require("./sub-services/formula-material.service");
const formula_logic_service_1 = require("./sub-services/formula-logic.service");
const formula_generator_service_1 = require("./formula-generator.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let FormulaModule = class FormulaModule {
};
exports.FormulaModule = FormulaModule;
exports.FormulaModule = FormulaModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [formula_controller_1.FormulaController],
        providers: [
            formula_base_service_1.FormulaBaseService,
            formula_material_service_1.FormulaMaterialService,
            formula_logic_service_1.FormulaLogicService,
            formula_generator_service_1.FormulaGeneratorService,
        ],
        exports: [formula_base_service_1.FormulaBaseService],
    })
], FormulaModule);
//# sourceMappingURL=formula.module.js.map