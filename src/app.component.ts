import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from '~/core/layout/service/layout.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor(private layoutSvc: LayoutService) {}
}
