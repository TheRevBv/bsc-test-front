import { ITableConfig } from '~/shared';

export const productoTableConfig: ITableConfig = {
    title: 'Catálogo de Productos',
    rows: 10,
    rowsPerPageOptions: [10, 20, 50],
    globalFilterFields: ['clave', 'nombre'],
    columns: [
        {
            field: 'clave',
            header: 'Clave',
            sortable: true,
            width: '150px',
        },
        {
            field: 'nombre',
            header: 'Nombre',
            sortable: true,
            width: '200px',
        },
        {
            field: 'existencia',
            header: 'Existencia',
            sortable: true,
            width: '120px',
        },
        {
            field: 'precio',
            header: 'Precio',
            sortable: true,
            width: '120px',
        },
        {
            field: 'fechaAlta',
            header: 'Fecha Alta',
            sortable: true,
            width: '160px',
        },
        {
            field: 'estatus',
            header: 'Estatus',
            sortable: false,
            width: '120px',
            badge: true,
        },
    ],
    actions: [
        {
            icon: 'pi pi-pencil',
            tooltip: 'Editar producto',
            action: (row: any) => {
                console.log('Editar', row);
            },
        },
        {
            icon: 'pi pi-trash',
            tooltip: 'Eliminar producto',
            severity: 'danger',
            action: (row: any) => {
                console.log('Eliminar', row);
            },
        },
    ],
};
