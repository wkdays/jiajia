import { IsString, IsOptional, IsArray } from 'class-validator';

export class ExportDto {
  @IsString()
  entity: string; // 'material', 'health', 'formula', 'law'

  @IsOptional()
  @IsArray()
  ids?: number[];

  @IsOptional()
  @IsString()
  format?: string; // 'csv', 'json'
}

export class ImportDto {
  @IsString()
  entity: string;
}
