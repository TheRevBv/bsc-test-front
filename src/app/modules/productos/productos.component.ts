import { Component, OnInit, signal } from '@angular/core';
import { Producto } from './models/producto.model';
import { ProductosService } from './services/productos.service';
import { GenericDataTableComponent } from '~/shared/components/generic-data-table/generic-data-table.component';
import { ITableConfig } from '~/shared';
import { getTableConfig } from './productos.settings';

@Component({
    selector: 'bsc-productos',
    standalone: true,
    templateUrl: './productos.component.html',
    imports: [GenericDataTableComponent],
})
export default class ProductosComponent implements OnInit {
    productos = signal<Producto[]>([]);
    tableConfig!: ITableConfig;

    constructor(private productosSvc: ProductosService) {}

    ngOnInit(): void {
        this.tableConfig = getTableConfig(this.onActionClicked.bind(this));
        this.loadProductos();
    }

    onActionClicked(action: string, row: Producto | null) {
        switch (action) {
            case 'edit':
                console.log('edit', row);
                break;
            case 'delete':
                console.log('delete', row);
                break;
            case 'add':
                console.log('add', row);
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
}
