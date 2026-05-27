import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLawMaterialDto } from '../dto/law.dto';
export declare class LawMaterialService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateLawMaterialDto): Promise<{
        id: number;
        materialId: number;
        complianceStatus: string | null;
        lawId: number;
        limitDosage: string | null;
        labelRequire: string | null;
    }>;
    findByLaw(lawId: number): Promise<({
        material: {
            name: string;
            id: number;
            alias: string | null;
        };
    } & {
        id: number;
        materialId: number;
        complianceStatus: string | null;
        lawId: number;
        limitDosage: string | null;
        labelRequire: string | null;
    })[]>;
    remove(id: number): Promise<{
        id: number;
        materialId: number;
        complianceStatus: string | null;
        lawId: number;
        limitDosage: string | null;
        labelRequire: string | null;
    }>;
}
