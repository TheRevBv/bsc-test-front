import { Component, inject, OnInit, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PrimeModule } from '~/shared';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario.model';
import { FormErrorComponent } from '~/shared/components/form-error/form-error.component';
import { passwordRegex } from '~/utils';

@Component({
    selector: 'bsc-manager-usuarios-dialog',
    standalone: true,
    templateUrl: './manager-usuarios-dialog.component.html',
    styleUrls: ['./manager-usuarios-dialog.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PrimeModule,
        FormErrorComponent,
    ],
    providers: [MessageService],
})
export class ManagerUsuariosDialogComponent implements OnInit {
    private fb = inject(FormBuilder);
    private usuarioSvc = inject(UsuariosService);
    private ref = inject(DynamicDialogRef);
    private config = inject(DynamicDialogConfig);
    private messageSvc = inject(MessageService);

    form!: FormGroup;
    action: 'agregar' | 'editar' = 'agregar';
    usuario?: Usuario;

    ngOnInit(): void {
        this.action = this.config.data?.action;
        this.usuario = this.config.data?.usuario;

        this.form = this.fb.group({
            nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
            correo: ['', [Validators.required, Validators.email]],
            imagen: [''],
            ...(this.action === 'agregar' && {
                contrasena: [
                    '',
                    [Validators.required, Validators.pattern(passwordRegex)],
                ],
            }),
        });

        if (this.usuario) {
            this.form.patchValue(this.usuario);
        }
    }

    get titulo(): string {
        return this.action === 'editar' ? 'Editar Usuario' : 'Agregar Usuario';
    }

    cerrar(): void {
        this.ref.close();
    }

    guardar(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageSvc.add({
                severity: 'error',
                summary: 'Formulario inválido',
                detail: 'Revisa los campos requeridos.',
            });
            return;
        }

        const dto = this.form.getRawValue();

        if (this.action === 'editar') {
            this.usuarioSvc
                .update(this.usuario!.usuarioId?.toString()!, dto)
                .subscribe(() => {
                    this.messageSvc.add({
                        severity: 'success',
                        summary: 'Actualizado',
                        detail: 'El usuario fue actualizado correctamente',
                    });
                    this.ref.close('refresh');
                });
        } else {
            this.usuarioSvc.create(dto).subscribe(() => {
                this.messageSvc.add({
                    severity: 'success',
                    summary: 'Creado',
                    detail: 'El usuario fue registrado correctamente',
                });
                this.ref.close('refresh');
            });
        }
    }
}
