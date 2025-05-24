// import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    EventEmitter,
    Input,
    Output,
    Component,
    ChangeDetectionStrategy,
} from '@angular/core';
import { PrimeModule } from '~/shared/prime/prime.module';

@Component({
    selector: 'bsc-table-toolbar',
    standalone: true,
    templateUrl: './table-toolbar.component.html',
    styleUrls: ['./table-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [PrimeModule],
})
export class TableToolbarComponent {
    @Input() title = 'Items';
    @Output() export = new EventEmitter<void>();
    @Output() add = new EventEmitter<string>();
}
