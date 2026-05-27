import { IsString, IsOptional, IsInt, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateBookBaseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsDateString()
  publishDate?: string;

  @IsOptional()
  @IsString()
  bookType?: string;
}

export class UpdateBookBaseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsDateString()
  publishDate?: string;

  @IsOptional()
  @IsString()
  bookType?: string;
}

export class QueryBookDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  author?: string;
}

export class CreateBookRecordDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  bookId?: number;

  @IsOptional()
  @IsDateString()
  studyDate?: string;

  @IsOptional()
  @IsString()
  chapter?: string;

  @IsOptional()
  @IsString()
  coreContent?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateBookRelDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  recordId?: number;

  @IsOptional()
  @IsString()
  relType?: string;

  @IsInt()
  @Type(() => Number)
  relIdVal: number;
}
