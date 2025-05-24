import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[bscUppercase]',
    standalone: true,
})
export class UppercaseDirective {
    constructor(private ngControl: NgControl) {}

    @HostListener('input', ['$event'])
    onInput(event: KeyboardEvent): void {
        const input = event.target as HTMLInputElement;
        // Primero, se eliminan los acentos mediante la normalización Unicode y se remueven los diacríticos
        const valueWithoutAccents = input.value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        // Luego, se transforma a mayúsculas
        const upperValue = valueWithoutAccents.toUpperCase();
        input.value = upperValue;
        this.ngControl.control?.setValue(upperValue, { emitEvent: false });
    }
}
