import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./reports.component'),
    },
    {
        path: 'existencias',
        loadComponent: () =>
            import('./pages/reporte-existencias/reporte-existencias.component'),
    },
] as Routes;
