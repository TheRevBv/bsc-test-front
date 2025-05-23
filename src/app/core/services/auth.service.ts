import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment as env } from '~envs/enviroment';
import { HttpService, LocalStorageService } from '~/shared';
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
        private router: Router,
        // private localStorageSvc: LocalStorageService,
        private sessionStorageSvc: LocalStorageService,
    ) {
        super();
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
        this.sessionStorageSvc.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return this.sessionStorageSvc.getItem(this.tokenKey);
    }

    logout() {
        this.sessionStorageSvc.removeItem(this.tokenKey);
        this._user.set(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    setUserData(user: DataLogin) {
        this._user.set(user);
    }
}
