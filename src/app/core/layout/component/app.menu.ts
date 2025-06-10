import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuItem, IMenuItem } from './app.menuitem';
import { AuthService } from '~/core/services/auth.service';
import { RolesEnum } from '~/utils';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuItem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of filteredMenu(); let i = index">
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
    private auth = inject(AuthService);

    model: IMenuItem[] = [
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
            items: [
                {
                    label: 'Gestión de usuarios',
                    icon: 'pi pi-fw pi-user',
                    allowedRoles: [RolesEnum.ADMINISTRADOR],
                    items: [
                        {
                            label: 'Usuarios',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['/modules/admin/usuarios'],
                            allowedRoles: [RolesEnum.ADMINISTRADOR],
                        },
                        {
                            label: 'Roles',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: ['/modules/roles'],
                            allowedRoles: [RolesEnum.ADMINISTRADOR],
                        },
                        {
                            label: 'Permisos',
                            icon: 'pi pi-fw pi-key',
                            routerLink: ['/modules/permisos'],
                            allowedRoles: [RolesEnum.ADMINISTRADOR],
                        },
                    ],
                },
                {
                    label: 'Inventario',
                    icon: 'pi pi-fw pi-box',
                    allowedRoles: [
                        RolesEnum.ADMINISTRADOR,
                        RolesEnum.PERSONAL_ADMINISTRATIVO,
                    ],
                    items: [
                        {
                            label: 'Productos',
                            icon: 'pi pi-fw pi-barcode',
                            routerLink: ['/modules/inventario/productos'],
                            allowedRoles: [
                                RolesEnum.ADMINISTRADOR,
                                RolesEnum.PERSONAL_ADMINISTRATIVO,
                            ],
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
                            allowedRoles: [
                                RolesEnum.ADMINISTRADOR,
                                RolesEnum.VENDEDOR,
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    // Esta función filtra recursivamente el menú según el rol actual
    private filterMenuByRole = (
        items: IMenuItem[],
        role: string | null,
    ): IMenuItem[] => {
        return items
            .filter(
                (item) =>
                    !item.allowedRoles ||
                    (role && item.allowedRoles.includes(role)),
            )
            .map((item) => ({
                ...item,
                items: item.items
                    ? this.filterMenuByRole(item.items as IMenuItem[], role)
                    : undefined,
            }))
            .filter(
                (item) => !item.items || (item.items && item.items.length > 0),
            );
    };

    // Computed reactivo: se actualiza si cambia el usuario o rol
    filteredMenu = computed(() => {
        const user = this.auth.user();
        const role = user?.rol ?? null;
        return this.filterMenuByRole(this.model, role);
    });
}
