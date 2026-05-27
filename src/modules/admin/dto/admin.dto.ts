import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Role } from '../../../common/constants/roles';

export class QueryUserDto extends PaginationDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class UpdateUserRoleDto {
  @IsEnum(Role)
  role: Role;
}
