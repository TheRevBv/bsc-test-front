import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li
                app-menuitem
                *ngIf="!item.separator"
                [item]="item"
                [index]="i"
                [root]="true"
            ></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `,
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Indicadores',
                items: [
                    {
                        label: 'Tablero de indicadores',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Módulos',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/modules'],
                items: [
                    {
                        label: 'Gestión de usuarios',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/modules/usuarios'],
                            },
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/modules/roles'],
                            },
                            {
                                label: 'Permisos',
                                icon: 'pi pi-fw pi-key',
                                routerLink: ['/modules/permisos'],
                            },
                        ],
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud'],
                    },
                    {
                        label: 'Inventario',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: 'Productos',
                                icon: 'pi pi-fw pi-barcode',
                                routerLink: ['/modules/inventario/productos'],
                            },
                        ],
                    },
                    {
                        label: 'Ventas',
                        icon: 'pi pi-fw pi-dollar',
                        items: [
                            {
                                label: 'Pedidos',
                                icon: 'pi pi-fw pi-truck',
                                routerLink: ['/modules/ventas/pedidos'],
                            },
                        ],
                    },
                ],
            },
        ];
    }
}
