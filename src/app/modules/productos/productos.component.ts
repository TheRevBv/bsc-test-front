import { Component, OnInit, signal } from '@angular/core';
import { Producto } from './models/producto.model';
import { productoTableConfig } from './productos.settings';
import { ProductosService } from './services/productos.service';
import { GenericDataTableComponent } from '~/shared/components/generic-data-table/generic-data-table.component';

@Component({
    selector: 'bsc-productos',
    standalone: true,
    templateUrl: './productos.component.html',
    imports: [GenericDataTableComponent],
})
export default class ProductosComponent implements OnInit {
    productos = signal<Producto[]>([]);
    tableConfig = productoTableConfig;

    constructor(private productosSvc: ProductosService) {}

    ngOnInit() {
        this.loadProductos();
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
