import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class GlobalSearchDto extends PaginationDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  entities?: string[]; // 'material', 'health', 'formula', 'law', 'book'
}

export class AdvancedFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  entity?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  healthId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  materialId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  dateFrom?: string;

  @IsOptional()
  @IsString()
  dateTo?: string;
}
