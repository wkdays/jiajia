import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHealthMechanismDto } from '../dto/health.dto';
export declare class HealthMechanismService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateHealthMechanismDto): Promise<{
        id: number;
        healthId: number;
        pathogenesis: string | null;
        coreTarget: string | null;
        pathway: string | null;
    }>;
    findByHealth(healthId: number): Promise<{
        id: number;
        healthId: number;
        pathogenesis: string | null;
        coreTarget: string | null;
        pathway: string | null;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        healthId: number;
        pathogenesis: string | null;
        coreTarget: string | null;
        pathway: string | null;
    }>;
}
