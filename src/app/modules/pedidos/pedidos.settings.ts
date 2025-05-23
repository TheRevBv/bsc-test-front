import { ITableConfig } from '~/shared';

export function getTableConfig(
    clicked: (action: string, row: any) => void,
): ITableConfig {
    return {
        title: 'Pedidos',
        rows: 10,
        rowsPerPageOptions: [10, 20, 50],
        globalFilterFields: ['cliente'],
        columns: [
            {
                field: 'pedidoId',
                header: 'ID',
                sortable: true,
            },
            {
                field: 'cliente',
                header: 'Cliente',
                sortable: true,
            },
            {
                field: 'fechaPedido',
                header: 'Fecha',
                sortable: true,
                date: true,
            },
            {
                field: 'totalProductos',
                header: 'Total Productos',
                sortable: true,
            },
            {
                field: 'productos',
                header: 'Resumen',
                format(row: any): string {
                    let summary = '';
                    for (const producto of row.productos) {
                        summary += `${producto.productoNombre} (${producto.cantidad}),`;
                    }
                    return summary;
                },
            },
        ],
        actions: [
            {
                icon: 'pi pi-eye',
                tooltip: 'Ver detalle',
                actionKey: 'view',
                clicked,
            },
            {
                icon: 'pi pi-ban',
                tooltip: 'Cancelar pedido',
                actionKey: 'delete',
                severity: 'danger',
                clicked,
            },
        ],
    };
}
