import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormsModule,
    FormGroup,
    FormControl,
} from '@angular/forms';
import {
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../models/producto.model';
import { MessageService } from 'primeng/api';
import { AlertService, PrimeModule } from '~/shared';
import { FormErrorComponent } from '~/shared/components/form-error/form-error.component';
import { UppercaseDirective } from '~/shared/directive/uppercase.directive';
import { OnlyNumbersDirective } from '~/shared/directive/only-numbers.directive';
import { DecimalNumbersDirective } from '~/shared/directive/decimal-numbers.directive';
import { ToggleSwitchComponent } from '~/shared/components/toogle-switch/toogle-switch.component';

@Component({
    selector: 'bsc-manager-productos-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeModule,
        FormErrorComponent,
        ToggleSwitchComponent,
        UppercaseDirective,
        OnlyNumbersDirective,
        // DecimalNumbersDirective,
    ],
    templateUrl: './manager-productos-dialog.component.html',
    styleUrls: ['./manager-productos-dialog.component.scss'],
    providers: [MessageService],
})
export class ManagerProductosDialogComponent implements OnInit {
    private fb = inject(FormBuilder);
    private productoSvc = inject(ProductosService);
    private config = inject(DynamicDialogConfig);
    private ref = inject(DynamicDialogRef);
    private messageSvc = inject(MessageService);
    private alertSvc = inject(AlertService);
    private producto?: Producto;

    action: 'agregar' | 'editar' | 'ver' = 'agregar';
    modoLectura = false;
    form!: FormGroup;

    constructor() {
        this.form = this.fb.group({
            clave: this.fb.control('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(11),
                ],
            }),
            nombre: this.fb.control('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                ],
            }),
            existencia: this.fb.control(0, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0)],
            }),
            precio: this.fb.control(0, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0)],
            }),
            estado: this.fb.control(1, {
                nonNullable: true,
                validators: Validators.required,
            }),
        });
    }

    ngOnInit() {
        this.action = this.config.data?.action;
        this.producto = this.config.data?.producto;

        if (this.producto) {
            this.form.patchValue(this.producto);
        }

        if (this.action === 'ver') {
            this.modoLectura = true;
            this.form.disable();
        }
    }

    cerrar() {
        this.ref.close();
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageSvc.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos requeridos',
            });
            return;
        }

        const dto = this.form.getRawValue();

        if (this.action === 'editar') {
            this.productoSvc
                .update(this.producto?.productoId?.toString()!, dto)
                .subscribe(() => {
                    /*  this.messageSvc.add({
                        severity: 'success',
                        summary: 'Actualización exitosa',
                        detail: 'El producto fue actualizado correctamente',
                    }); */
                    this.alertSvc.showAlert(
                        'Actualización exitosa',
                        'El producto fue actualizado correctamente',
                        'success',
                    );
                    setTimeout(() => {
                        this.ref.close('refresh');
                    }, 300);
                });
        } else {
            this.productoSvc.create(dto).subscribe(() => {
                /*  this.messageSvc.add({
                    severity: 'success',
                    summary: 'Registro exitoso',
                    detail: 'El producto fue agregado correctamente',
                }); */
                this.alertSvc.showAlert(
                    'Registro exitoso',
                    'El producto fue agregado correctamente',
                    'success',
                );
                setTimeout(() => {
                    this.ref.close('refresh');
                }, 300);
            });
        }
    }

    get titulo() {
        return this.action === 'ver'
            ? 'Detalles del Producto'
            : this.action === 'editar'
            ? 'Editar Producto'
            : 'Agregar Producto';
    }
}
