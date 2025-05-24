import { Routes } from '@angular/router';

export default [
    {
        path: 'pedidos',
        loadComponent: () => import('./pedidos.component'),
    },
] as Routes;
