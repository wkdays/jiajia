import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHealthCauseDto } from '../dto/health.dto';
export declare class HealthCauseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateHealthCauseDto): Promise<{
        id: number;
        healthId: number;
        internalCause: string | null;
        externalCause: string | null;
        highRiskGroup: string | null;
    }>;
    findByHealth(healthId: number): Promise<{
        id: number;
        healthId: number;
        internalCause: string | null;
        externalCause: string | null;
        highRiskGroup: string | null;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        healthId: number;
        internalCause: string | null;
        externalCause: string | null;
        highRiskGroup: string | null;
    }>;
}
