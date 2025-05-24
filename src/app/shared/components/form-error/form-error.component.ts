import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AbstractControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'bsc-form-error',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div
            *ngIf="
                controlObj?.invalid &&
                (controlObj?.touched || controlObj?.dirty)
            "
        >
            <small class="text-red-500 text-sm">
                {{ getErrorMessage() }}
            </small>
        </div>
    `,
})
export class FormErrorComponent {
    @Input() control!: string;
    @Input() form!: FormGroup;

    get controlObj(): AbstractControl | null {
        return this.form.get(this.control);
    }

    getErrorMessage(): string {
        const control = this.controlObj;
        if (!control || !control.errors) return '';

        if (control.errors['required']) return 'Este campo es requerido.';
        if (control.errors['min']) return 'El valor es menor al permitido.';
        if (control.errors['email']) return 'El correo no es válido.';
        if (control.errors['maxlength'])
            return 'Supera el máximo de caracteres.';
        if (control.errors['minlength'])
            return 'No cumple con la longitud mínima.';

        return 'Campo inválido.';
    }
}
