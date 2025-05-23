import { Routes } from '@angular/router';

export default [
    {
        path: 'inventario',
        loadChildren: () => import('./productos/productos.routes'),
    },
    { path: '**', redirectTo: '/notfound' },
] as Routes;
