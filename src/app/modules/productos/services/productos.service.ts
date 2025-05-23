// services/productos.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from '~/shared';
import { Producto } from '../models/producto.model';
import { environment as env } from '~envs/enviroment';

@Injectable({
    providedIn: 'root',
})
export class ProductosService extends BaseService<Producto> {
    constructor() {
        super(env.api, 'productos');
    }
}
