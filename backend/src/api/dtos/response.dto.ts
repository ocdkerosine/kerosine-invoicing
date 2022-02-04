import { PaginatedResponseMeta } from '@interfaces/base.interface';

export class Response<T = any> {
  status: string;
  message?: string;
  data: T;
}

export class PaginatedResponse<T = any> {
  status: string;
  message?: string;
  data: T[];
  meta: PaginatedResponseMeta;
}
