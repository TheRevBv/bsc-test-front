import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Producto } from './models/producto.model';
import { ProductosService } from './services/productos.service';
import { GenericDataTableComponent } from '~/shared/components/generic-data-table/generic-data-table.component';
import { ITableConfig } from '~/shared';
import { getTableConfig } from './productos.settings';
import { ManagerProductosDialogComponent } from './manager-productos-dialog/manager-productos-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'bsc-productos',
    standalone: true,
    templateUrl: './productos.component.html',
    imports: [GenericDataTableComponent],
    providers: [DialogService],
})
export default class ProductosComponent implements OnInit {
    productos = signal<Producto[]>([]);
    tableConfig!: ITableConfig;

    @ViewChild(GenericDataTableComponent) dataTable!: GenericDataTableComponent;

    constructor(
        private dialog: DialogService,
        private productosSvc: ProductosService,
    ) {}

    ngOnInit(): void {
        this.tableConfig = getTableConfig(this.onActionClicked.bind(this));
        this.loadProductos();
    }

    onActionClicked(action: string, row: Producto | null) {
        switch (action) {
            case 'edit':
                console.log('edit', row);
                this.openDialog('editar', row!);
                break;
            case 'delete':
                console.log('delete', row);
                break;
            case 'add':
                console.log('add', row);
                this.openDialog('agregar', undefined);
                break;
            default:
                break;
        }
    }
    loadProductos() {
        this.productosSvc.getAll().subscribe((res) => {
            if (res.isSuccess && res.data) {
                this.productos.set(res.data);
            }
        });
    }

    handlePageChange(event: any) {
        // Ejecuta una nueva consulta al backend con los parámetros event.page, event.rows, etc.
        console.log('page change', event);
    }

    private openDialog(
        action: 'agregar' | 'editar' | 'ver',
        producto?: Producto,
    ) {
        const ref = this.dialog.open(ManagerProductosDialogComponent, {
            header: '',
            data: { action, producto },
            styleClass: 'w-[95vw] sm:w-[450px]',
        });

        ref.onClose.subscribe((res) => {
            if (res === 'refresh') {
                this.dataTable.getData();
            }
        });
    }
}
