export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginatedResponseMeta {
  perPage: number;
  currentPage: number;
  totalPages: number;
  count: number;
  total: number;
}

export interface Error {
  message: string;
  property?: string;
}
