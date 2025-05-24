import { Routes } from '@angular/router';

export default [
    {
        path: 'inventario',
        loadChildren: () => import('./productos/productos.routes'),
    },
    {
        path: 'admin',
        loadChildren: () => import('./usuarios/usuarios.routes'),
    },
    { path: '**', redirectTo: '/notfound' },
] as Routes;
