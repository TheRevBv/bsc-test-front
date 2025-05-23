import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from '~envs/enviroment';
import {
    HttpService,
    LocalStorageService,
    SessionStorageService,
} from '~/shared';
import { Observable, tap } from 'rxjs';
import { endpoints } from '~/utils';

export interface LoginResponse {
    isSuccess: boolean;
    data: DataLogin;
    message: string;
    errors: null;
}

export interface DataLogin {
    token: string;
    refreshToken: string;
    usuarioId: number;
    nombreUsuario: string;
    expiration: Date;
}
export class LogiRequest implements ILoginRequest {
    correo!: string;
    contrasena!: string;
}

export interface ILoginRequest {
    correo: string;
    contrasena: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends HttpService {
    #apiUrl = env.api;
    private tokenKey = 'access_token';
    private _user = signal<DataLogin | null>(null);
    public readonly user = computed(() => this._user());

    constructor(
        // private sessionStorageSvc: SessionStorageService,
        private router: Router,
        private localStorageSvc: LocalStorageService,
    ) {
        super();
        const token = this.getToken();
        if (token) {
            const decoded = this.decodeToken(token);
            if (decoded) {
                this._user.set({
                    token,
                    refreshToken: '', // si no lo tienes guardado, pon ''
                    usuarioId: Number(decoded?.unique_name),
                    nombreUsuario: decoded?.given_name,
                    expiration: new Date(decoded.exp * 1000),
                });
            }
        }
    }

    login(email: string, password: string): Observable<LoginResponse> {
        const loginRequest: LogiRequest = {
            correo: email,
            contrasena: password,
        };
        return this.post<LoginResponse, ILoginRequest>(
            this.#apiUrl,
            endpoints.AUTH.LOGIN,
            loginRequest,
            { headers: { 'x-skip-auth': 'true' } },
        ).pipe(
            tap((response) => {
                if (!response.isSuccess) {
                    throw new Error(response.message);
                }
                this.saveToken(response.data.token);
                this.setUserData(response.data);
            }),
        );
    }

    saveToken(token: string) {
        this.localStorageSvc.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return this.localStorageSvc.getItem(this.tokenKey);
    }

    logout() {
        this.localStorageSvc.removeItem(this.tokenKey);
        this._user.set(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;

        const user = this.user();
        if (!user || !user.expiration) return false;

        return new Date(user.expiration) > new Date(); // aún válido
    }

    setUserData(user: DataLogin) {
        this._user.set(user);
    }

    private decodeToken(token: string): any {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload));
        } catch (e) {
            console.error('Token inválido');
            return null;
        }
    }
}
