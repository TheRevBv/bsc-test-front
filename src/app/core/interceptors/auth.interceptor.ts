import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '~/core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authSvc: AuthService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        // ⛔️ Si viene con x-skip-auth, no inyectamos token
        if (req.headers.has('x-skip-auth')) {
            const clean = req.clone({
                headers: req.headers.delete('x-skip-auth'),
            });
            return next.handle(clean);
        }

        const token = this.authSvc.getToken();
        if (token) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return next.handle(cloned);
        }

        return next.handle(req);
    }
}
