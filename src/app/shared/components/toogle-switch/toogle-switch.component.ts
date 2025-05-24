import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    ReactiveFormsModule,
    FormsModule,
    FormControl,
} from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Subscription } from 'rxjs';

@Component({
    selector: 'bsc-toggle-switch',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleSwitchComponent),
            multi: true,
        },
    ],
    template: `
        <p-toggleswitch [disabled]="disabled" [formControl]="boolControl" />
    `,
})
export class ToggleSwitchComponent implements ControlValueAccessor {
    @Input() disabled = false;
    boolControl = new FormControl(false);
    private sub?: Subscription;

    innerValue = false;

    private onChange = (value: number) => {};
    private onTouched = () => {};

    ngOnInit() {
        this.sub = this.boolControl.valueChanges.subscribe((val) => {
            this.onChange(val ? 1 : 0);
        });
    }

    writeValue(value: number): void {
        this.boolControl.setValue(value === 1, { emitEvent: false });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.boolControl.disable();
        } else {
            this.boolControl.enable();
        }
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
