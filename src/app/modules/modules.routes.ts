import { Routes } from '@angular/router';
import { roleGuard } from '~/core/guards/roles.guard';
import { RolesEnum } from '~/utils';

export default [
    {
        path: 'inventario',
        loadChildren: () => import('./productos/productos.routes'),
        canActivate: [
            roleGuard([
                RolesEnum.ADMINISTRADOR,
                RolesEnum.PERSONAL_ADMINISTRATIVO,
            ]),
        ],
    },
    {
        path: 'admin',
        loadChildren: () => import('./usuarios/usuarios.routes'),
        canActivate: [roleGuard([RolesEnum.ADMINISTRADOR])],
    },
    {
        path: 'ventas',
        loadChildren: () => import('./pedidos/pedidos.routes'),
        canActivate: [roleGuard([RolesEnum.ADMINISTRADOR, RolesEnum.VENDEDOR])],
    },
    { path: '**', redirectTo: '/notfound' },
] as Routes;
