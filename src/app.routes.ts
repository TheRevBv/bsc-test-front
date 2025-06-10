import { Routes } from '@angular/router';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';
import { AppLayout } from '~/core/layout/component/app.layout';
import { authGuard } from '~/core/guards/auth.guard';
import { nonAuthGuard } from '~/core/guards/non-auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            {
                path: 'modules',
                loadChildren: () => import('~/modules/modules.routes'),
            },
        ],
    },
    // { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    {
        path: 'auth',
        canActivate: [nonAuthGuard],
        loadChildren: () => import('~/modules/auth/auth.routes'),
    },
    { path: '**', redirectTo: '/auth' },
];
