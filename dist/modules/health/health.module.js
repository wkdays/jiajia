"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthModule = void 0;
const common_1 = require("@nestjs/common");
const health_controller_1 = require("./health.controller");
const health_base_service_1 = require("./sub-services/health-base.service");
const health_mechanism_service_1 = require("./sub-services/health-mechanism.service");
const health_cause_service_1 = require("./sub-services/health-cause.service");
const health_material_service_1 = require("./sub-services/health-material.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [health_controller_1.HealthController],
        providers: [
            health_base_service_1.HealthBaseService,
            health_mechanism_service_1.HealthMechanismService,
            health_cause_service_1.HealthCauseService,
            health_material_service_1.HealthMaterialService,
        ],
        exports: [health_base_service_1.HealthBaseService, health_material_service_1.HealthMaterialService],
    })
], HealthModule);
//# sourceMappingURL=health.module.js.map