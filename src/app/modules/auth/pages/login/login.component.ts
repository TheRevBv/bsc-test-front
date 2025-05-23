import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppFloatingConfigurator } from '~/core/layout/component/app.floatingconfigurator';
import { AuthService } from '~/core/services/auth.service';
import { PrimeModule } from '~/shared';
import { validatePassword } from '~/utils';

@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        PrimeModule,
        ReactiveFormsModule,
        RouterModule,
        AppFloatingConfigurator,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
    loginForm!: FormGroup;
    passwordErrors: string[] = [];

    constructor(
        private authSvc: AuthService,
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.buildForm();
    }

    private buildForm() {
        this.loginForm = this.fb.group({
            correo: ['', [Validators.required, Validators.email]],
            contrasena: [
                '',
                [
                    Validators.required,
                    this.passwordValidator.bind(this), // Validador personalizado
                ],
            ],
        });

        // Escuchar cambios en el campo contrasena para actualizar los mensajes de error
        this.loginForm.get('contrasena')?.valueChanges.subscribe((value) => {
            const result = validatePassword(value);
            this.passwordErrors = result.messages;
        });
    }

    // Validador personalizado para la contraseña
    private passwordValidator(
        control: AbstractControl,
    ): ValidationErrors | null {
        const result = validatePassword(control.value);
        return result.isValid ? null : { invalidPassword: result.messages };
    }

    login() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
            return;
        }
        const { correo, contrasena } = this.loginForm.value;

        this.authSvc.login(correo, contrasena).subscribe({
            next: (res) => {
                if (!res.isSuccess) {
                    console.log(res.message);
                    // Aquí podrías mostrar un mensaje de error visual, por ejemplo, con un p-message de PrimeNG
                }
                this.router.navigate(['/']);
            },
            error: (err) => {
                // Mostrar error visual, por ejemplo, con p-message
                console.error('Error en login:', err);
            },
        });
    }
}
