import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBookRecordDto } from '../dto/book.dto';
export declare class BookRecordService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookRecordDto): Promise<{
        id: number;
        bookId: number;
        studyDate: Date | null;
        chapter: string | null;
        coreContent: string | null;
        notes: string | null;
    }>;
    findByBook(bookId: number): Promise<({
        relations: {
            id: number;
            recordId: number;
            relType: string;
            relIdVal: number;
        }[];
    } & {
        id: number;
        bookId: number;
        studyDate: Date | null;
        chapter: string | null;
        coreContent: string | null;
        notes: string | null;
    })[]>;
    remove(id: number): Promise<{
        id: number;
        bookId: number;
        studyDate: Date | null;
        chapter: string | null;
        coreContent: string | null;
        notes: string | null;
    }>;
}
