import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { ConfirmService, PrimeModule } from '~/shared';
import { AuthService } from '~/core/services/auth.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        PrimeModule,
        // AppConfigurator
    ],
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    providers: [ConfirmService, ConfirmationService, MessageService],
})
export class TopbarComponent {
    userItems: MenuItem[] = [];
    userName = 'Joshua Salazar';
    userRole = 'Administrador';

    showMobileMenu = false;

    constructor(
        public layoutService: LayoutService,
        private authSvc: AuthService,
        private router: Router,
        private confirmSvc: ConfirmService,
    ) {
        this.userItems = [
            {
                label: `👤 ${this.userName}`,
                disabled: true,
            },
            {
                label: `🔐 Rol: ${this.userRole}`,
                disabled: true,
            },
            { separator: true },
            {
                label: 'Cerrar sesión',
                icon: 'pi pi-sign-out',
                command: () => this.logout(),
            },
        ];
    }

    logout() {
        // Aquí va tu lógica real para cerrar sesión
        this.confirmSvc.showConfirm('¿Estás seguro de cerrar sesión?', () => {
            this.authSvc.logout();
        });
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme,
        }));
    }

    toggleMobileActions() {
        this.showMobileMenu = !this.showMobileMenu;
    }
}
