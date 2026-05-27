import { PrismaService } from '../../prisma/prisma.service';
import { QueryUserDto, UpdateUserRoleDto } from './dto/admin.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllUsers(query: QueryUserDto): Promise<{
        items: {
            email: string;
            username: string;
            name: string | null;
            id: number;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findUserById(id: number): Promise<{
        email: string;
        username: string;
        name: string | null;
        id: number;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserRole(id: number, dto: UpdateUserRoleDto): Promise<{
        email: string;
        username: string;
        name: string | null;
        id: number;
        role: string;
    }>;
    getSystemStats(): Promise<{
        users: number;
        materials: number;
        healthProblems: number;
        formulas: number;
        laws: number;
        books: number;
        auditLogs: number;
    }>;
    getAuditLogs(query: {
        page?: number;
        pageSize?: number;
        userId?: number;
    }): Promise<{
        items: {
            id: number;
            createdAt: Date;
            entity: string;
            userId: number;
            action: string;
            entityId: number | null;
            changes: string | null;
            ip: string;
            userAgent: string;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
}
