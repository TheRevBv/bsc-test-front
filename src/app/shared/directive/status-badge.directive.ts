import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[bscStatusBadge]',
    standalone: true,
})
export class StatusBadgeDirective {
    constructor(
        private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef,
    ) {}

    @Input() set bscStatusBadge(value: any) {
        this.vcr.clear();

        const badge = this.createBadge(value);

        // Creamos una vista embebida usando ng-template dinámico
        this.vcr.createEmbeddedView(this.tpl, {
            $implicit: badge,
            value,
        });
    }

    private createBadge(value: any): { text: string; class: string } {
        switch (value) {
            case 'Activo':
            case 1:
                return {
                    text: 'Activo',
                    class: 'bg-green-100 text-green-800 px-2 py-1 rounded-lg',
                };
            case 'Inactivo':
            case 0:
                return {
                    text: 'Inactivo',
                    class: 'bg-red-100 text-red-800 px-2 py-1 rounded-lg',
                };
            default:
                return {
                    text: value,
                    class: 'bg-gray-100 text-gray-800 px-2 py-1 rounded-lg',
                };
        }
    }
}
