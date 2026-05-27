import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLawUpdateDto } from '../dto/law.dto';
export declare class LawUpdateService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateLawUpdateDto): Promise<{
        id: number;
        lawId: number;
        updateDate: Date | null;
        updateContent: string | null;
    }>;
    findByLaw(lawId: number): Promise<{
        id: number;
        lawId: number;
        updateDate: Date | null;
        updateContent: string | null;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        lawId: number;
        updateDate: Date | null;
        updateContent: string | null;
    }>;
}
