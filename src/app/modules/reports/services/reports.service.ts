import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExistenciaInventario } from '../interfaces';
import { HttpService } from '~/shared';
import { environment as env } from '~envs/enviroment';

@Injectable({ providedIn: 'root' })
export class ReportsService extends HttpService {
    #apiUrl = env.api;
    constructor() {
        super();
    }

    getRptExistenciasData(): Observable<{
        isSuccess: boolean;
        data: ExistenciaInventario[];
    }> {
        return this.get(this.#apiUrl, 'productos/reporte-existencias');
    }

    downloadRptExistenciasExcel(): Observable<HttpResponse<Blob>> {
        return this.http.get(`${this.#apiUrl}productos/reporte-existencias`, {
            params: { download: 'true' },
            responseType: 'blob',
            observe: 'response',
        });
    }
}
