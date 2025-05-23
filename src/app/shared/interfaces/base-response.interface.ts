export interface IBaseResponse<T> {
    errors: any[];
    isSuccess: boolean;
    message: string | string[] | null;
    data: T | null;
}
