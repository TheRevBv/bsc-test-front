import { Routes } from '@angular/router';
import { Access } from './pages/access';
import { Error404 } from './pages/error404';

export default [
    { path: 'access', component: Access },
    { path: 'error-404', component: Error404 },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component'),
    },
    { path: '**', redirectTo: 'login' },
] as Routes;
