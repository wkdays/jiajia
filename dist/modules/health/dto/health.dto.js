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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHealthMaterialDto = exports.CreateHealthCauseDto = exports.CreateHealthMechanismDto = exports.QueryHealthDto = exports.UpdateHealthBaseDto = exports.CreateHealthBaseDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
class CreateHealthBaseDto {
    name;
    type;
    symptom;
}
exports.CreateHealthBaseDto = CreateHealthBaseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthBaseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthBaseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthBaseDto.prototype, "symptom", void 0);
class UpdateHealthBaseDto {
    name;
    type;
    symptom;
}
exports.UpdateHealthBaseDto = UpdateHealthBaseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHealthBaseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHealthBaseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHealthBaseDto.prototype, "symptom", void 0);
class QueryHealthDto extends pagination_dto_1.PaginationDto {
    name;
    type;
}
exports.QueryHealthDto = QueryHealthDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryHealthDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryHealthDto.prototype, "type", void 0);
class CreateHealthMechanismDto {
    healthId;
    pathogenesis;
    coreTarget;
    pathway;
}
exports.CreateHealthMechanismDto = CreateHealthMechanismDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateHealthMechanismDto.prototype, "healthId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthMechanismDto.prototype, "pathogenesis", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthMechanismDto.prototype, "coreTarget", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthMechanismDto.prototype, "pathway", void 0);
class CreateHealthCauseDto {
    healthId;
    internalCause;
    externalCause;
    highRiskGroup;
}
exports.CreateHealthCauseDto = CreateHealthCauseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateHealthCauseDto.prototype, "healthId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthCauseDto.prototype, "internalCause", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthCauseDto.prototype, "externalCause", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthCauseDto.prototype, "highRiskGroup", void 0);
class CreateHealthMaterialDto {
    healthId;
    materialId;
    matchLogic;
}
exports.CreateHealthMaterialDto = CreateHealthMaterialDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateHealthMaterialDto.prototype, "healthId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateHealthMaterialDto.prototype, "materialId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthMaterialDto.prototype, "matchLogic", void 0);
//# sourceMappingURL=health.dto.js.map