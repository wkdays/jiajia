"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialModule = void 0;
const common_1 = require("@nestjs/common");
const material_controller_1 = require("./material.controller");
const material_base_service_1 = require("./sub-services/material-base.service");
const material_supplier_service_1 = require("./sub-services/material-supplier.service");
const material_effect_service_1 = require("./sub-services/material-effect.service");
const material_clinic_service_1 = require("./sub-services/material-clinic.service");
const material_patent_service_1 = require("./sub-services/material-patent.service");
const material_safety_service_1 = require("./sub-services/material-safety.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let MaterialModule = class MaterialModule {
};
exports.MaterialModule = MaterialModule;
exports.MaterialModule = MaterialModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [material_controller_1.MaterialController],
        providers: [
            material_base_service_1.MaterialBaseService,
            material_supplier_service_1.MaterialSupplierService,
            material_effect_service_1.MaterialEffectService,
            material_clinic_service_1.MaterialClinicService,
            material_patent_service_1.MaterialPatentService,
            material_safety_service_1.MaterialSafetyService,
        ],
        exports: [material_base_service_1.MaterialBaseService],
    })
], MaterialModule);
//# sourceMappingURL=material.module.js.map