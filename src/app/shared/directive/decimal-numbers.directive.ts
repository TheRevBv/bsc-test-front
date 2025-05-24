import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[bscDecimalNumbers]',
    standalone: true,
})
export class DecimalNumbersDirective {
    private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/);
    private specialKeys: string[] = [
        'Backspace',
        'Tab',
        'End',
        'Home',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
    ];

    constructor(private el: ElementRef) {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (
            this.specialKeys.indexOf(event.key) !== -1 ||
            (event.key === 'a' && event.ctrlKey) ||
            (event.key === 'c' && event.ctrlKey) ||
            (event.key === 'v' && event.ctrlKey) ||
            (event.key === 'x' && event.ctrlKey)
        ) {
            return;
        }

        const current: string = this.el.nativeElement.value;
        const next: string = current.concat(event.key);

        if (event.key === '.' && current.includes('.')) {
            event.preventDefault();
        }

        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const pastedData = event.clipboardData?.getData('text/plain') || '';
        const current: string = this.el.nativeElement.value;
        const cursorPosition: number =
            this.el.nativeElement.selectionStart || 0;
        const next: string =
            current.slice(0, cursorPosition) +
            pastedData +
            current.slice(cursorPosition);

        if (next && String(next).match(this.regex)) {
            this.el.nativeElement.value = next;
            this.el.nativeElement.dispatchEvent(new Event('input'));
        }
    }
}
