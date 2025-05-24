import { Component, signal, ViewChild } from '@angular/core';
import { ITableConfig } from '~/shared';
import { GenericDataTableComponent } from '~/shared/components/generic-data-table/generic-data-table.component';
import { getTableConfig } from './pedidos.settings';
import { Pedido } from './models/pedido.model';
import { PedidosService } from './services/pedidos.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ManagerPedidosDialogComponent } from './manager-pedidos-dialog/manager-pedidos-dialog.component';

@Component({
    selector: 'bsc-pedidos',
    standalone: true,
    imports: [GenericDataTableComponent],
    providers: [DialogService],
    templateUrl: './pedidos.component.html',
})
export default class PedidoComponent {
    pedidos = signal<Pedido[]>([]);
    tableConfig!: ITableConfig;

    @ViewChild(GenericDataTableComponent) dataTable!: GenericDataTableComponent;

    constructor(
        private dialog: DialogService,
        private pedidosSvc: PedidosService,
    ) {}

    ngOnInit(): void {
        this.tableConfig = getTableConfig(this.onActionClicked.bind(this));
        this.loadPedidos();
    }

    onActionClicked(action: string, row: Pedido | null) {
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
    loadPedidos() {
        this.pedidosSvc.getAll().subscribe((res) => {
            if (res.isSuccess && res.data) {
                this.pedidos.set(res.data);
            }
        });
    }

    handlePageChange(event: any) {
        // Ejecuta una nueva consulta al backend con los parámetros event.page, event.rows, etc.
        console.log('page change', event);
    }

    private openDialog(action: 'agregar' | 'editar' | 'ver', pedido?: Pedido) {
        const ref = this.dialog.open(ManagerPedidosDialogComponent, {
            header: '',
            data: { action, pedido },
            styleClass: 'w-[80vw]',
        });
        ref.onClose.subscribe((res) => {
            if (res === 'refresh') {
                this.dataTable.getData();
            }
        });
    }
}
