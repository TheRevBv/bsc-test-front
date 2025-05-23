import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    signal,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ITableConfig, PrimeModule } from '~/shared';
import { TableToolbarComponent } from '../table-toolbar/table-toolbar.component';
import { ButtonSeverity } from 'primeng/button';
import { TableActionsComponent } from '../table-actions/table-actions.component';

@Component({
    selector: 'bsc-generic-data-table',
    standalone: true,
    imports: [
        PrimeModule,
        CommonModule,
        TableToolbarComponent,
        TableActionsComponent,
    ],
    templateUrl: './generic-data-table.component.html',
})
export class GenericDataTableComponent {
    @Input() data: any[] = [];
    @Input() config!: ITableConfig;

    @Output() pageChange = new EventEmitter<{
        page: number;
        rows: number;
        sortField?: string;
        sortOrder?: number;
        filters?: any;
        globalFilter?: string;
    }>();

    @ViewChild('dt') dt!: Table;

    onLazyLoad(event: any) {
        this.pageChange.emit({
            page: event.first / event.rows + 1,
            rows: event.rows,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
            filters: event.filters,
            globalFilter: event.globalFilter,
        });
    }

    globalFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.dt.filterGlobal(value, 'contains');
    }

    exportCSV() {
        this.dt.exportCSV();
    }
}
