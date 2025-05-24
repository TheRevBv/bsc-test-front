import { ITableConfig } from '~/shared';

export function getTableConfig(
    clicked: (action: string, row: any) => void,
): ITableConfig {
    return {
        title: 'Catálogo de Productos',
        rows: 10,
        rowsPerPageOptions: [10, 20, 50],
        globalFilterFields: ['clave', 'nombre'],
        columns: [
            { field: 'clave', header: 'Clave', sortable: true },
            { field: 'nombre', header: 'Nombre', sortable: true },
            { field: 'existencia', header: 'Existencia', sortable: true },
            {
                field: 'precio',
                header: 'Precio',
                sortable: true,
                currency: true,
            },
            {
                field: 'fechaAlta',
                header: 'Fecha Alta',
                sortable: true,
                date: true,
            },
            { field: 'estatus', header: 'Estatus', badge: true },
        ],
        actions: [
            {
                icon: 'pi pi-pencil',
                tooltip: 'Editar producto',
                actionKey: 'edit',
                clicked,
            },
            {
                icon: 'pi pi-ban',
                tooltip: 'Inactivar producto',
                severity: 'danger',
                actionKey: 'delete',
                clicked,
            },
        ],
    };
}
