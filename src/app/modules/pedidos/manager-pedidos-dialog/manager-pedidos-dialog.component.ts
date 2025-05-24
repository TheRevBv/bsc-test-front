import { Component, inject, OnInit, signal } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '~/shared';
import { PedidosService } from '../services/pedidos.service';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FieldSelectAutocompleteComponent } from '~/shared/components/field-select-autocomplete/field-select-autocomplete.component';
import { ProductoForm, PedidoForm } from '../interfaces/pedidos-form.interface';
import { Pedido } from '../models/pedido.model';

@Component({
    selector: 'bsc-manager-pedidos-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PrimeModule,
        FieldSelectAutocompleteComponent,
    ],
    templateUrl: './manager-pedidos-dialog.component.html',
    styleUrls: ['./manager-pedidos-dialog.component.scss'],
    providers: [MessageService],
})
export class ManagerPedidosDialogComponent implements OnInit {
    private fb = inject(FormBuilder);
    private pedidosSvc = inject(PedidosService);
    private ref = inject(DynamicDialogRef);
    private config = inject(DynamicDialogConfig);
    private messageSvc = inject(MessageService);

    form!: FormGroup;
    carrito = signal<ProductoForm[]>([]);

    minDate: Date | undefined;

    maxDate: Date | undefined;

    ngOnInit(): void {
        this.form = this.fb.group({
            cliente: ['', Validators.required],
            fechaPedido: [new Date(), Validators.required],
            productoSeleccionado: [null],
            cantidad: [1, [Validators.required, Validators.min(1)]],
        });
    }

    agregarProducto(): void {
        const id = this.form.value.productoSeleccionado;
        const cantidad = this.form.value.cantidad;

        if (!id || cantidad <= 0) {
            this.messageSvc.add({
                severity: 'warn',
                summary: 'Producto inválido',
                detail: 'Seleccione un producto válido y una cantidad válida',
            });
            return;
        }

        const yaExiste = this.carrito().some((p) => p.productoId === id);
        if (yaExiste) {
            this.messageSvc.add({
                severity: 'warn',
                summary: 'Producto repetido',
                detail: 'Este producto ya está en el pedido',
            });
            return;
        }

        const nuevo: ProductoForm = { productoId: id, cantidad };
        this.carrito.set([...this.carrito(), nuevo]);
        this.form.patchValue({ productoSeleccionado: null, cantidad: 1 });
    }

    quitarProducto(id: number): void {
        this.carrito.set(this.carrito().filter((p) => p.productoId !== id));
    }

    guardar(): void {
        console.log(this.form);
        console.log(this.form.value);
        console.log(this.carrito());
        if (this.form.invalid || this.carrito().length === 0) {
            this.messageSvc.add({
                severity: 'error',
                summary: 'Formulario incompleto',
                detail: 'Revisa los datos y agrega al menos un producto',
            });
            return;
        }

        const dto: PedidoForm = {
            cliente: this.form.value.cliente,
            fechaPedido: this.form.value.fechaPedido,
            usuarioId: 1, // ← ajustar según AuthService
            productos: this.carrito(),
        };

        const pedidoDto = dto as Pedido;

        this.pedidosSvc.create(pedidoDto).subscribe((res) => {
            if (res.isSuccess) {
                this.messageSvc.add({
                    severity: 'success',
                    summary: 'Pedido creado',
                    detail: 'Se guardó correctamente',
                });
                this.ref.close('refresh');
            }
        });
    }

    cerrar(): void {
        this.ref.close();
    }
}
