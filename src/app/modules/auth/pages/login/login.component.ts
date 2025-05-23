import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppFloatingConfigurator } from '~/core/layout/component/app.floatingconfigurator';
import { AuthService } from '~/core/services/auth.service';
import { PrimeModule } from '~/shared';

@Component({
    selector: 'app-login',
    imports: [
        PrimeModule,
        ReactiveFormsModule,
        RouterModule,
        AppFloatingConfigurator,
    ],
    templateUrl: './login.component.html',
})
export default class LoginComponent {
    loginForm!: FormGroup;

    constructor(
        private authSvc: AuthService,
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.buildForm();
    }

    private buildForm() {
        this.loginForm = this.fb.group({
            correo: [''],
            contrasena: [''],
        });
    }

    login() {
        if (this.loginForm.invalid) {
            return;
        }
        const { correo, contrasena } = this.loginForm.value;

        this.authSvc.login(correo, contrasena).subscribe({
            next: (res) => {
                if (!res.isSuccess) {
                    console.log(res.message);
                }
                this.router.navigate(['/dashboard']);
            },
            error: () => {
                // mostrar error visual
            },
        });
    }
}
