import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Role } from '../../../common/constants/roles';
export declare class QueryUserDto extends PaginationDto {
    role?: Role;
}
export declare class UpdateUserRoleDto {
    role: Role;
}
