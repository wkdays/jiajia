import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialPatentDto } from '../dto/material.dto';
export declare class MaterialPatentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMaterialPatentDto): Promise<{
        id: number;
        materialId: number;
        patentNo: string | null;
        patentType: string | null;
        patentCountry: string | null;
        marketStatus: string | null;
        competitorInfo: string | null;
    }>;
    findByMaterial(materialId: number): Promise<{
        id: number;
        materialId: number;
        patentNo: string | null;
        patentType: string | null;
        patentCountry: string | null;
        marketStatus: string | null;
        competitorInfo: string | null;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        materialId: number;
        patentNo: string | null;
        patentType: string | null;
        patentCountry: string | null;
        marketStatus: string | null;
        competitorInfo: string | null;
    }>;
}
