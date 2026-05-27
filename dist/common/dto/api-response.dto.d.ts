export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    timestamp: string;
}
export interface PaginatedResponse<T> {
    code: number;
    message: string;
    data: {
        items: T[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    };
    timestamp: string;
}
