import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBookBaseDto, UpdateBookBaseDto, QueryBookDto } from '../dto/book.dto';
export declare class BookBaseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookBaseDto): Promise<{
        name: string;
        id: number;
        author: string | null;
        publisher: string | null;
        publishDate: Date | null;
        bookType: string | null;
    }>;
    findAll(query: QueryBookDto): Promise<{
        items: ({
            records: {
                id: number;
                bookId: number;
                studyDate: Date | null;
                chapter: string | null;
                coreContent: string | null;
                notes: string | null;
            }[];
        } & {
            name: string;
            id: number;
            author: string | null;
            publisher: string | null;
            publishDate: Date | null;
            bookType: string | null;
        })[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        records: ({
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
        })[];
    } & {
        name: string;
        id: number;
        author: string | null;
        publisher: string | null;
        publishDate: Date | null;
        bookType: string | null;
    }>;
    update(id: number, dto: UpdateBookBaseDto): Promise<{
        name: string;
        id: number;
        author: string | null;
        publisher: string | null;
        publishDate: Date | null;
        bookType: string | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        author: string | null;
        publisher: string | null;
        publishDate: Date | null;
        bookType: string | null;
    }>;
}
