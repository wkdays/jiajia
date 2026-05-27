import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateLawBaseDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  effectiveDate?: string;

  @IsOptional()
  @IsString()
  scope?: string;
}

export class UpdateLawBaseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  effectiveDate?: string;

  @IsOptional()
  @IsString()
  scope?: string;
}

export class QueryLawDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;
}

export class CreateLawMaterialDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  lawId?: number;

  @IsInt()
  @Type(() => Number)
  materialId: number;

  @IsOptional()
  @IsString()
  complianceStatus?: string;

  @IsOptional()
  @IsString()
  limitDosage?: string;

  @IsOptional()
  @IsString()
  labelRequire?: string;
}

export class CreateLawUpdateDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  lawId?: number;

  @IsOptional()
  @IsString()
  updateDate?: string;

  @IsOptional()
  @IsString()
  updateContent?: string;
}
