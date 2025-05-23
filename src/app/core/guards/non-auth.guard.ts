import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const nonAuthGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
        return true; // Permite el acceso si NO está logueado
    }

    router.navigate(['/']); // Redirige si ya está autenticado
    return false;
};
