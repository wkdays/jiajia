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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const book_base_service_1 = require("./sub-services/book-base.service");
const book_record_service_1 = require("./sub-services/book-record.service");
const book_rel_service_1 = require("./sub-services/book-rel.service");
const book_dto_1 = require("./dto/book.dto");
let BookController = class BookController {
    baseService;
    recordService;
    relService;
    constructor(baseService, recordService, relService) {
        this.baseService = baseService;
        this.recordService = recordService;
        this.relService = relService;
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
    createBookRecord(bookId, dto) {
        return this.recordService.create({ ...dto, bookId });
    }
    findBookRecords(bookId) {
        return this.recordService.findByBook(bookId);
    }
    createBookRel(recordId, dto) {
        return this.relService.create({ ...dto, recordId });
    }
    findBookRels(recordId) {
        return this.relService.findByRecord(recordId);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create book' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.CreateBookBaseDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List books with pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.QueryBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get book detail' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update book' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, book_dto_1.UpdateBookBaseDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete book' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/records'),
    (0, swagger_1.ApiOperation)({ summary: 'Add record to book' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, book_dto_1.CreateBookRecordDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "createBookRecord", null);
__decorate([
    (0, common_1.Get)(':id/records'),
    (0, swagger_1.ApiOperation)({ summary: 'List records in book' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findBookRecords", null);
__decorate([
    (0, common_1.Post)(':id/records/:recordId/related'),
    (0, swagger_1.ApiOperation)({ summary: 'Add related entity to record' }),
    __param(0, (0, common_1.Param)('recordId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, book_dto_1.CreateBookRelDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "createBookRel", null);
__decorate([
    (0, common_1.Get)(':id/records/:recordId/related'),
    (0, swagger_1.ApiOperation)({ summary: 'List related entities for record' }),
    __param(0, (0, common_1.Param)('recordId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findBookRels", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiTags)('Books'),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_base_service_1.BookBaseService,
        book_record_service_1.BookRecordService,
        book_rel_service_1.BookRelService])
], BookController);
//# sourceMappingURL=book.controller.js.map