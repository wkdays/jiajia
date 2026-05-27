import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class CreateBookBaseDto {
    name: string;
    author?: string;
    publisher?: string;
    publishDate?: string;
    bookType?: string;
}
export declare class UpdateBookBaseDto {
    name?: string;
    author?: string;
    publisher?: string;
    publishDate?: string;
    bookType?: string;
}
export declare class QueryBookDto extends PaginationDto {
    name?: string;
    author?: string;
}
export declare class CreateBookRecordDto {
    bookId?: number;
    studyDate?: string;
    chapter?: string;
    coreContent?: string;
    notes?: string;
}
export declare class CreateBookRelDto {
    recordId?: number;
    relType?: string;
    relIdVal: number;
}
