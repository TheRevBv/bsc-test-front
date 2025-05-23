import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSeverity } from 'primeng/button';
import { PrimeModule, TableAction } from '~/shared';

@Component({
    selector: 'bsc-table-actions',
    imports: [PrimeModule, CommonModule],
    templateUrl: './table-actions.component.html',
    styleUrl: './table-actions.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class TableActionsComponent {
    severity: ButtonSeverity = 'secondary';
    @Input() row: any;
    @Input() actions: TableAction[] = [];
}
