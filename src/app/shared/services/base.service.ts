import { HttpResponse } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import {
    IBaseRequest,
    IBaseResponseAll,
    IBaseResponse,
    HttpService,
} from '~/shared';
import { validateQueryParams } from '~/utils';

export abstract class BaseService<T> extends HttpService {
    private readonly endpointBase!: string;
    private readonly apiUrl!: string;

    protected constructor(apiUrl: string, endpointBase: string) {
        super();
        this.apiUrl = apiUrl;
        this.endpointBase = endpointBase;
    }

    #response = signal<IBaseResponseAll<T[]>>({
        errors: [],
        isSuccess: false,
        data: null,
        message: '',
        total: 0,
        pages: 0,
        page: 0,
        limit: 0,
    });

    #simple = signal<IBaseResponse<T>>({
        isSuccess: false,
        data: null,
        message: '',
        errors: [],
    });

    public items = computed(() => this.#response().data || []);
    public simpleItem = computed(() => this.#simple().data || null);
    public isLoading = computed(() => !this.#response().isSuccess);
    public isLoadingSimple = computed(() => !this.#simple().isSuccess);

    getAll(request?: IBaseRequest): Observable<IBaseResponseAll<T[]>> {
        const query = validateQueryParams(request);
        return this.get<IBaseResponseAll<T[]>>(
            this.apiUrl,
            `${this.endpointBase}`,
            {
                params: query,
            },
        );
    }

    getById(id: string): Observable<IBaseResponse<T>> {
        return this.get<IBaseResponse<T>>(
            this.apiUrl,
            `${this.endpointBase}/${id}`,
        );
    }

    create(dto: Partial<T>): Observable<IBaseResponse<T>> {
        return this.post<IBaseResponse<T>, Partial<T>>(
            this.apiUrl,
            `${this.endpointBase}`,
            dto,
        );
    }

    update(id: string, dto: Partial<T>): Observable<IBaseResponse<T>> {
        return this.put<IBaseResponse<T>, Partial<T>>(
            this.apiUrl,
            `${this.endpointBase}/${id}`,
            dto,
        );
    }

    remove(id: string): Observable<IBaseResponse<boolean>> {
        return this.delete<IBaseResponse<boolean>>(
            this.apiUrl,
            `${this.endpointBase}/${id}`,
        );
    }

    exportToExcel(request?: IBaseRequest): Observable<Blob> {
        return this.get<Blob>(this.apiUrl, `${this.endpointBase}/export`, {
            params: { ...request },
            responseType: 'blob' as 'json',
        });
    }

    // Opcional: funciones para actualizar signals desde fuera
    public updateItems(response: IBaseResponseAll<T[]>): void {
        this.#response.set(response);
    }

    public updateSimpleItem(response: IBaseResponse<T>): void {
        this.#simple.set(response);
    }
}
