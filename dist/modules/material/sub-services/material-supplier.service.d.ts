import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMaterialSupplierDto } from '../dto/material.dto';
export declare class MaterialSupplierService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMaterialSupplierDto): Promise<{
        name: string;
        id: number;
        materialId: number;
        country: string | null;
        qualification: string | null;
        spec: string | null;
        price: number | null;
        priceDate: Date | null;
    }>;
    findByMaterial(materialId: number): Promise<{
        name: string;
        id: number;
        materialId: number;
        country: string | null;
        qualification: string | null;
        spec: string | null;
        price: number | null;
        priceDate: Date | null;
    }[]>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        materialId: number;
        country: string | null;
        qualification: string | null;
        spec: string | null;
        price: number | null;
        priceDate: Date | null;
    }>;
}
