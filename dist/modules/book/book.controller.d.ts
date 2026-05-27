import { BookBaseService } from './sub-services/book-base.service';
import { BookRecordService } from './sub-services/book-record.service';
import { BookRelService } from './sub-services/book-rel.service';
import { CreateBookBaseDto, UpdateBookBaseDto, QueryBookDto, CreateBookRecordDto, CreateBookRelDto } from './dto/book.dto';
export declare class BookController {
    private baseService;
    private recordService;
    private relService;
    constructor(baseService: BookBaseService, recordService: BookRecordService, relService: BookRelService);
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
    createBookRecord(bookId: number, dto: CreateBookRecordDto): Promise<{
        id: number;
        bookId: number;
        studyDate: Date | null;
        chapter: string | null;
        coreContent: string | null;
        notes: string | null;
    }>;
    findBookRecords(bookId: number): Promise<({
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
    createBookRel(recordId: number, dto: CreateBookRelDto): Promise<{
        id: number;
        recordId: number;
        relType: string;
        relIdVal: number;
    }>;
    findBookRels(recordId: number): Promise<{
        id: number;
        recordId: number;
        relType: string;
        relIdVal: number;
    }[]>;
}
