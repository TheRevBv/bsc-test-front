import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, computed, inject } from '@angular/core';
import { throwError, delay, map, catchError, Observable } from 'rxjs';
import { AlertService, IBaseResponse, IHttpService } from '~/shared';
import { environment as env } from '~envs/enviroment';

@Injectable({
    providedIn: 'root',
})
export class HttpService implements IHttpService {
    protected http = inject(HttpClient);
    #alertSvc = inject(AlertService);

    constructor() {}

    public get<T>(
        apiUrl: string,
        endpoint: string,
        options?: {},
        includeAuth: boolean = true,
    ): Observable<T> {
        let headers = new HttpHeaders();
        if (!includeAuth) {
            headers = headers.set('x-skip-auth', 'true');
        }
        options = {
            ...options,
            headers,
        };

        return this.http.get<T>(`${apiUrl}${endpoint}`, options).pipe(
            map((response) => response),
            catchError((error) => this.handleError(apiUrl, error)),
        );
    }

    public post<T, CreateDto>(
        apiUrl: string,
        endpoint: string,
        body: CreateDto,
        options?: {},
        includeAuth: boolean = true,
    ): Observable<T> {
        let headers = new HttpHeaders();
        if (!includeAuth) {
            headers = headers.set('x-skip-auth', 'true');
        }
        options = {
            ...options,
            headers,
        };

        return this.http.post<T>(`${apiUrl}${endpoint}`, body, options).pipe(
            map((response) => response),
            catchError((error) => this.handleError(apiUrl, error)),
        );
    }

    public put<T, UpdateDto>(
        apiUrl: string,
        endpoint: string,
        body?: UpdateDto,
        includeAuth: boolean = true,
    ): Observable<T> {
        let headers = new HttpHeaders();
        if (!includeAuth) {
            headers = headers.set('x-skip-auth', 'true');
        }

        return this.http
            .patch<T>(`${apiUrl}${endpoint}`, body, { headers })
            .pipe(
                map((response) => response),
                catchError((error) => this.handleError(apiUrl, error)),
            );
    }

    public delete<T>(
        apiUrl: string,
        endpoint: string,
        includeAuth: boolean = true,
    ): Observable<T> {
        let headers = new HttpHeaders();
        if (!includeAuth) {
            headers = headers.set('x-skip-auth', 'true');
        }

        return this.http.delete<T>(`${apiUrl}${endpoint}`, { headers }).pipe(
            map((response) => response),
            catchError((error) => this.handleError(apiUrl, error)),
        );
    }

    private handleError(apiUrl: string, error: any) {
        let errorMessage = `Ha ocurrido un error: ${error.message}`;
        console.error(errorMessage);

        // Validar si es mi API específica
        if (apiUrl === env.api) {
            // Suponiendo que la respuesta de error sigue el formato BaseResponse
            const baseResponse = error.error as IBaseResponse<any>;

            if (baseResponse && baseResponse.message) {
                // Si el mensaje es un array, unirlo en una sola cadena
                const message = Array.isArray(baseResponse.message)
                    ? baseResponse.message.join(', ')
                    : baseResponse.message;
                this.#alertSvc.showAlert(`${message}`, '', 'error');
            } else {
                // Mensaje genérico si no se encuentra el mensaje en BaseResponse
                this.#alertSvc.showAlert(
                    'Hubo un problema en la solicitud',
                    'Ocurrió un error en la solicitud al servicio BSC',
                    'error',
                );
            }
        } else {
            // Manejo de errores para otras APIs o errores de Angular
            this.#alertSvc.showAlert(
                'Ha ocurrido un error',
                errorMessage,
                'error',
            );
        }

        return throwError(() => new Error(errorMessage));
    }
}
