import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[bscCurrency]',
    standalone: true,
})
export class CurrencyDirective {
    constructor(
        private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef,
    ) {}

    @Input() set bscCurrency(value: number) {
        this.vcr.clear();
        const view = this.tpl.createEmbeddedView({
            $implicit: new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
            }).format(value),
        });
        this.vcr.insert(view);
    }
}
