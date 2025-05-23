import { Routes } from '@angular/router';

export default [
    {
        path: 'productos',
        loadComponent: () => import('./productos.component'),
    },
] as Routes;
