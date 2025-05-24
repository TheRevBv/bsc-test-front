import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { BaseService, IBaseResponse } from '~/shared';
import { environment as env } from '~envs/enviroment';
import { endpoints } from '~/utils';

@Injectable({ providedIn: 'root' })
export class UsuariosService extends BaseService<Usuario> {
    #apiUrl: string = env.api;
    constructor() {
        super(env.api, 'usuarios');
    }

    asignarRol(
        usuarioId: string,
        roles: number[],
    ): Observable<IBaseResponse<boolean>> {
        return this.http.put<IBaseResponse<boolean>>(
            `${this.#apiUrl}${endpoints.USUARIOS.ASIGNAR_ROL.replace(
                ':id',
                usuarioId,
            )}`,
            { rolesIds: roles },
        );
    }
}
