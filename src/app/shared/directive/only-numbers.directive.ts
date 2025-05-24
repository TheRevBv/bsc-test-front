import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[bscOnlyNumbers]',
    standalone: true,
})
export class OnlyNumbersDirective {
    constructor(private el: ElementRef) {}

    @HostListener('input', ['$event']) onInputChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value;

        // Reemplaza cualquier carácter que no sea un dígito
        input.value = value.replace(/[^0-9]/g, '');
    }
}
