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
import { FieldSelectComponent } from '~/shared/components/field-select/field-select.component';

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
        FieldSelectComponent,
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

    constructor() {
        this.action = this.config.data?.action;
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
            rolId: ['', [Validators.required]],
        });
    }

    get titulo(): string {
        return this.action === 'editar' ? 'Editar Usuario' : 'Agregar Usuario';
    }

    ngOnInit(): void {
        this.loadUsuario();
    }

    cerrar(): void {
        this.ref.close();
    }

    guardar(): void {
        console.log('form values', this.form.getRawValue());
        //mostrar en consola que campos no son validos
        console.log('form', this.form);
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
        const dtoRolId = dto.rolId;
        delete dto.rolId;

        if (this.action === 'editar') {
            this.usuarioSvc
                .update(this.usuario!.usuarioId!.toString(), dto)
                .subscribe(() => {
                    this.asignarRol(
                        this.usuario!.usuarioId!.toString(),
                        dtoRolId,
                    );
                });
        } else {
            this.usuarioSvc.create(dto).subscribe((res) => {
                if (!res.isSuccess || !res.data) {
                    this.messageSvc.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: res.message?.toString(),
                    });
                    return;
                }
                this.messageSvc.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Usuario creado correctamente',
                });
                const data = res.data as any;
                const nuevoId = res.data?.usuarioId ?? data?.id; // según tu backend
                if (nuevoId) {
                    this.asignarRol(nuevoId.toString(), dto.rolId);
                }
            });
        }
    }

    private asignarRol(usuarioId: string, rolId: number): void {
        this.usuarioSvc.asignarRol(usuarioId, [rolId]).subscribe(() => {
            this.messageSvc.add({
                severity: 'success',
                summary: 'Éxito',
                detail:
                    this.action === 'editar'
                        ? 'Usuario actualizado correctamente'
                        : 'Usuario creado correctamente',
            });
            this.ref.close('refresh');
        });
    }

    private loadUsuario(): void {
        console.log('config', this.config);
        this.usuarioSvc
            .getById(this.config.data?.usuario.usuarioId!.toString())
            .subscribe((res) => {
                if (res.isSuccess && res.data) {
                    this.usuario = res.data;
                    if (this.usuario) {
                        this.form.patchValue(this.usuario);
                    }
                }
            });
    }
}
