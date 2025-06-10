import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function roleGuard(expectedRoles: string[]): CanActivateFn {
    return (route: ActivatedRouteSnapshot) => {
        const auth = inject(AuthService);
        const router = inject(Router);
        const user = auth.user();

        // Si el usuario no está logueado, redirige
        if (!auth.isLoggedIn() || !user) {
            router.navigate(['/login']);
            return false;
        }
        // El usuario debe tener el rol adecuado
        if (user.rol && expectedRoles.includes(user.rol)) {
            return true;
        }

        // Si no tiene el rol, redirige a /notfound o página de acceso denegado
        router.navigate(['/notfound']);
        return false;
    };
}
