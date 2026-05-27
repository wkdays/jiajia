import type { Response } from 'express';
import { AdminService } from './admin.service';
import { BackupService } from './backup.service';
import { QueryUserDto, UpdateUserRoleDto } from './dto/admin.dto';
export declare class AdminController {
    private adminService;
    private backupService;
    constructor(adminService: AdminService, backupService: BackupService);
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
    createBackup(res: Response): Promise<void>;
    restoreFromBackup(backupContent: string): Promise<{
        restored: {
            users: any;
            materials: any;
            healthProblems: any;
            formulas: any;
            laws: any;
            books: any;
            auditLogs: any;
        };
        message: string;
    }>;
}
