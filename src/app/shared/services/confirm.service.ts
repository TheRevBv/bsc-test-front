import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable()
export class ConfirmService {
    constructor(
        private confirmationSvc: ConfirmationService,
        private messageSvc: MessageService,
    ) {}

    showConfirm(message: string, callback: () => void) {
        this.confirmationSvc.confirm({
            header: 'Seguro?',
            message,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Aceptar',
            },
            accept: () => {
                callback();
            },
            reject: () => {
                this.messageSvc.add({
                    severity: 'error',
                    summary: 'Denegado',
                    detail: 'Has denegado la solicitud',
                    life: 3000,
                });
            },
        });
    }
}
