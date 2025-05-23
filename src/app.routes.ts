import { Routes } from '@angular/router';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';
import { AppLayout } from '~/core/layout/component/app.layout';
import { authGuard } from '~/core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            // { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            // { path: 'documentation', component: Documentation },
            {
                path: 'pages',
                loadChildren: () => import('./app/pages/pages.routes'),
            },
        ],
    },
    // { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    {
        path: 'auth',
        loadChildren: () => import('~/modules/auth/auth.routes'),
    },
    { path: '**', redirectTo: '/auth' },
];
