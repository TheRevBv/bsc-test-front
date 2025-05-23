import { ButtonSeverity } from 'primeng/button';

export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    customTemplate?: string;
    width?: string;
    height?: string;
    badge?: boolean;
}

export interface TableAction {
    icon: string;
    tooltip: string;
    action: (row: any) => void;
    severity?: ButtonSeverity;
}

export interface ITableConfig {
    columns: TableColumn[];
    actions?: TableAction[];
    title?: string;
    rows?: number;
    rowsPerPageOptions?: number[];
    globalFilterFields?: string[];
}
