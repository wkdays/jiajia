"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const material_module_1 = require("./modules/material/material.module");
const health_module_1 = require("./modules/health/health.module");
const law_module_1 = require("./modules/law/law.module");
const formula_module_1 = require("./modules/formula/formula.module");
const book_module_1 = require("./modules/book/book.module");
const search_module_1 = require("./modules/search/search.module");
const export_import_module_1 = require("./modules/export-import/export-import.module");
const admin_module_1 = require("./modules/admin/admin.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: async () => ({
                    secret: process.env.JWT_SECRET || 'jiajia_jwt_secret_key_change_in_production',
                    signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') },
                }),
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            material_module_1.MaterialModule,
            health_module_1.HealthModule,
            law_module_1.LawModule,
            formula_module_1.FormulaModule,
            book_module_1.BookModule,
            search_module_1.SearchModule,
            export_import_module_1.ExportImportModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map