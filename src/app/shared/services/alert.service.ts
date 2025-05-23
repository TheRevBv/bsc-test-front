import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor() {}

    showAlert(
        title: string,
        text?: string,
        icon: SweetAlertIcon = 'info',
        confirmButton?: boolean,
    ): Promise<any> {
        if (confirmButton) {
            return Swal.fire({
                title,
                text,
                icon,
                confirmButtonText: 'Aceptar',
                showConfirmButton: true,
            });
        } else {
            return Swal.fire({
                title,
                text,
                icon,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    async showConfirm(
        title: string,
        text: string,
        icon: SweetAlertIcon = 'warning',
    ): Promise<boolean> {
        const result = await Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true,

            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        });
        return result.isConfirmed;
    }

    showCustom(options: SweetAlertOptions): Promise<any> {
        return Swal.fire(options);
    }

    /**
     * Muestra un loading con un mensaje
     * @param message Mensaje a mostrar en el loading
     */
    showLoading(message: string = 'Cargando...'): void {
        Swal.fire({
            title: message,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    }

    /**
     * Cierra el loading
     */
    closeLoading(): void {
        Swal.close();
    }

    /**
     * Muestra un alert con tres opciones: Sí, No y una extra personalizada
     * @param title Título del alert
     * @param text Texto del alert
     * @param extraButtonText Texto del botón extra
     * @param icon Icono opcional (por defecto 'question')
     * @returns {Promise<'yes' | 'no' | 'extra'>}
     */
    async showTripleOption(
        title: string,
        text: string,
        extraButtonText: string = 'Extra',
        icon: SweetAlertIcon = 'question',
        denyButtonColor: string = '#3085d6', // azul por default
    ): Promise<'yes' | 'no' | 'extra'> {
        const result = await Swal.fire({
            title,
            text,
            icon,
            denyButtonText: extraButtonText,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            denyButtonColor,
        });

        if (result.isConfirmed) {
            return 'yes';
        } else if (result.isDenied) {
            return 'extra';
        } else {
            return 'no';
        }
    }
}
