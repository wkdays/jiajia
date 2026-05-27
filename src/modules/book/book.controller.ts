import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookBaseService } from './sub-services/book-base.service';
import { BookRecordService } from './sub-services/book-record.service';
import { BookRelService } from './sub-services/book-rel.service';
import {
  CreateBookBaseDto,
  UpdateBookBaseDto,
  QueryBookDto,
  CreateBookRecordDto,
  CreateBookRelDto,
} from './dto/book.dto';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(
    private baseService: BookBaseService,
    private recordService: BookRecordService,
    private relService: BookRelService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create book' })
  create(@Body() dto: CreateBookBaseDto) {
    return this.baseService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List books with pagination' })
  findAll(@Query() query: QueryBookDto) {
    return this.baseService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book detail' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update book' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookBaseDto) {
    return this.baseService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.remove(id);
  }

  @Post(':id/records')
  @ApiOperation({ summary: 'Add record to book' })
  createBookRecord(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() dto: CreateBookRecordDto,
  ) {
    return this.recordService.create({ ...dto, bookId });
  }

  @Get(':id/records')
  @ApiOperation({ summary: 'List records in book' })
  findBookRecords(@Param('id', ParseIntPipe) bookId: number) {
    return this.recordService.findByBook(bookId);
  }

  @Post(':id/records/:recordId/related')
  @ApiOperation({ summary: 'Add related entity to record' })
  createBookRel(
    @Param('recordId', ParseIntPipe) recordId: number,
    @Body() dto: CreateBookRelDto,
  ) {
    return this.relService.create({ ...dto, recordId });
  }

  @Get(':id/records/:recordId/related')
  @ApiOperation({ summary: 'List related entities for record' })
  findBookRels(@Param('recordId', ParseIntPipe) recordId: number) {
    return this.relService.findByRecord(recordId);
  }
}
