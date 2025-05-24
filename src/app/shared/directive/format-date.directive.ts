import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[bscFormatDate]',
    standalone: true,
})
export class FormatDateDirective {
    constructor(
        private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef,
    ) {}

    @Input() set bscFormatDate(value: string | Date) {
        this.vcr.clear();
        const date = new Date(value);
        const view = this.tpl.createEmbeddedView({
            $implicit: date.toLocaleDateString('es-MX'),
        });
        this.vcr.insert(view);
    }
}
