import { ButtonSeverity } from 'primeng/button';

export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    format?: (row: any) => string;
    customTemplate?: string;
    width?: string;
    height?: string;
    badge?: boolean;
    currency?: boolean;
    date?: boolean;
}

export interface TableAction {
    icon: string;
    tooltip: string;
    severity?: ButtonSeverity;
    action?: (row: any) => void;
    clicked?: (action: string, row: any) => void;
    actionKey?: string; // ej: 'edit', 'delete'
}

export interface ITableConfig {
    columns: TableColumn[];
    actions?: TableAction[];
    title?: string;
    rows?: number;
    rowsPerPageOptions?: number[];
    globalFilterFields?: string[];
}
