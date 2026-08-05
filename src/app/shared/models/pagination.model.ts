export interface PaginationModel<T extends object> {
    data: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    currentPageCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
}
