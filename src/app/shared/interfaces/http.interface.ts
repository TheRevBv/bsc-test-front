import { Observable } from 'rxjs';

export interface IHttpService {
    get<T>(apiUrl: string, endpoint: string, options?: any): Observable<T>;
    post<T>(
        apiUrl: string,
        endpoint: string,
        body: T,
        options?: any,
    ): Observable<T>;
    put<T>(
        apiUrl: string,
        endpoint: string,
        body?: any,
        options?: any,
    ): Observable<T>;
    delete<T>(apiUrl: string, endpoint: string): Observable<T>;
}
