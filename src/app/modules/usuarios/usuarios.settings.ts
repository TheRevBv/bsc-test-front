import { ITableConfig } from '~/shared';

export function getTableConfig(
    clicked: (action: string, row: any) => void,
): ITableConfig {
    return {
        title: 'Catálogo de Usuarios',
        rows: 10,
        rowsPerPageOptions: [10, 20, 50],
        globalFilterFields: ['nombreUsuario', 'correo'],
        columns: [
            {
                field: 'nombreUsuario',
                header: 'Usuario',
                sortable: true,
            },
            {
                field: 'correo',
                header: 'Correo',
                sortable: true,
            },
            {
                field: 'fechaAlta',
                header: 'Fecha Alta',
                sortable: true,
                date: true,
            },
            {
                field: 'estatus',
                header: 'Estatus',
                badge: true,
            },
        ],
        actions: [
            {
                icon: 'pi pi-pencil',
                tooltip: 'Editar usuario',
                actionKey: 'edit',
                clicked,
            },
            {
                icon: 'pi pi-ban',
                tooltip: 'Inactivar usuario',
                severity: 'danger',
                actionKey: 'delete',
                clicked,
            },
        ],
    };
}
