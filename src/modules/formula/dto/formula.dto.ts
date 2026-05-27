import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateFormulaBaseDto {
  @IsString()
  name: string;

  @IsInt()
  @Type(() => Number)
  healthId: number;

  @IsOptional()
  @IsString()
  targetPeople?: string;

  @IsOptional()
  @IsString()
  targetCountry?: string;

  @IsOptional()
  @IsString()
  createUser?: string;
}

export class UpdateFormulaBaseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  targetPeople?: string;

  @IsOptional()
  @IsString()
  targetCountry?: string;
}

export class QueryFormulaDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  healthId?: number;
}

export class CreateFormulaMaterialDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  formulaId?: number;

  @IsInt()
  @Type(() => Number)
  materialId: number;

  @IsOptional()
  @Type(() => Number)
  dosage?: number;

  @IsOptional()
  @IsString()
  dosageLogic?: string;
}

export class CreateFormulaLogicDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  formulaId?: number;

  @IsOptional()
  @IsString()
  logicLine?: string;

  @IsOptional()
  @IsString()
  effectSummary?: string;

  @IsOptional()
  @IsString()
  complianceConclusion?: string;

  @IsOptional()
  @IsString()
  tips?: string;
}

export class GenerateFormulaDto {
  @IsInt()
  @Type(() => Number)
  healthId: number;

  @IsOptional()
  @IsString()
  targetPeople?: string;

  @IsOptional()
  @IsString()
  targetCountry?: string;
}
