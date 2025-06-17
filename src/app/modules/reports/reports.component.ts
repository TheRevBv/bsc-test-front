import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'bsc-reports',
    standalone: true,
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.scss',
    imports: [CommonModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReportsComponent {}
