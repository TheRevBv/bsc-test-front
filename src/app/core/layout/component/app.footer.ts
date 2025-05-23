import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Sys BSC © {{ year }} por
        <a
            href="https://github.com/TheRevBv"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary font-bold hover:underline"
            >Joshua Morin</a
        >
    </div>`,
})
export class AppFooter {
    year = new Date().getFullYear();
}
