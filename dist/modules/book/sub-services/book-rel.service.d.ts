import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBookRelDto } from '../dto/book.dto';
export declare class BookRelService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookRelDto): Promise<{
        id: number;
        recordId: number;
        relType: string;
        relIdVal: number;
    }>;
    findByRecord(recordId: number): Promise<{
        id: number;
        recordId: number;
        relType: string;
        relIdVal: number;
    }[]>;
    remove(id: number): Promise<{
        id: number;
        recordId: number;
        relType: string;
        relIdVal: number;
    }>;
}
