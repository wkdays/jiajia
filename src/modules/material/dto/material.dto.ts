import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateMaterialBaseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  alias?: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  intro?: string;

  @IsOptional()
  @IsString()
  source?: string;
}

export class UpdateMaterialBaseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  alias?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  intro?: string;

  @IsOptional()
  @IsString()
  source?: string;
}

export class QueryMaterialDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

export class CreateMaterialSupplierDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  materialId?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsString()
  spec?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;
}

export class CreateMaterialEffectDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  materialId?: number;

  @IsOptional()
  @IsString()
  functionalComponent?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  componentContent?: number;

  @IsOptional()
  @IsString()
  coreEffect?: string;

  @IsOptional()
  @IsString()
  targetPoint?: string;
}

export class CreateMaterialClinicDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  materialId?: number;

  @IsOptional()
  @IsString()
  effectiveDosage?: string;

  @IsOptional()
  @IsString()
  clinicType?: string;

  @IsOptional()
  @IsString()
  clinicPopulation?: string;

  @IsOptional()
  @IsString()
  clinicConclusion?: string;

  @IsOptional()
  @IsString()
  literatureSource?: string;
}

export class CreateMaterialPatentDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  materialId?: number;

  @IsOptional()
  @IsString()
  patentNo?: string;

  @IsOptional()
  @IsString()
  patentType?: string;

  @IsOptional()
  @IsString()
  patentCountry?: string;

  @IsOptional()
  @IsString()
  marketStatus?: string;

  @IsOptional()
  @IsString()
  competitorInfo?: string;
}

export class CreateMaterialSafetyDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  materialId?: number;

  @IsOptional()
  @IsString()
  safetyInfo?: string;

  @IsOptional()
  @IsString()
  bioavailability?: string;

  @IsOptional()
  @IsString()
  complianceStatus?: string;
}
