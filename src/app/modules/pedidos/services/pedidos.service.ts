import { Injectable } from '@angular/core';
import { BaseService } from '~/shared';
import { environment as env } from '~envs/enviroment';
import { Pedido } from '../models/pedido.model';

@Injectable({
    providedIn: 'root',
})
export class PedidosService extends BaseService<Pedido> {
    constructor() {
        super(env.api, 'pedidos');
    }
}
