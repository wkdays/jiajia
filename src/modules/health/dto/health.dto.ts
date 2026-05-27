import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateHealthBaseDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  symptom?: string;
}

export class UpdateHealthBaseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  symptom?: string;
}

export class QueryHealthDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

export class CreateHealthMechanismDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  healthId?: number;

  @IsOptional()
  @IsString()
  pathogenesis?: string;

  @IsOptional()
  @IsString()
  coreTarget?: string;

  @IsOptional()
  @IsString()
  pathway?: string;
}

export class CreateHealthCauseDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  healthId?: number;

  @IsOptional()
  @IsString()
  internalCause?: string;

  @IsOptional()
  @IsString()
  externalCause?: string;

  @IsOptional()
  @IsString()
  highRiskGroup?: string;
}

export class CreateHealthMaterialDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  healthId?: number;

  @IsInt()
  @Type(() => Number)
  materialId: number;

  @IsOptional()
  @IsString()
  matchLogic?: string;
}
