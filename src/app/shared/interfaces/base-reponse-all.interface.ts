import { IBaseResponse } from './base-response.interface';

export interface BaseReponseAll<T> extends IBaseResponse<T> {
    pages: number;
    page: number;
    total: number;
    limit: number;
}
