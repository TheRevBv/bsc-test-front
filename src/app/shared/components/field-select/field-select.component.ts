import { Component, Input, OnInit, forwardRef, inject } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    FormControl,
    Validators,
    Validator,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IBaseResponse, ISelectResponse } from '~/shared';
import { environment as env } from '~envs/enviroment';

@Component({
    selector: 'bsc-field-select',
    standalone: true,
    imports: [CommonModule, DropdownModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FieldSelectComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FieldSelectComponent),
            multi: true,
        },
    ],
    template: `
        <div class="w-full flex flex-col gap-2">
            <label *ngIf="label">{{ label }}</label>
            <p-dropdown
                [options]="options"
                [optionLabel]="'nombre'"
                [optionValue]="'id'"
                [formControl]="internalControl"
                [disabled]="disabled"
                placeholder="Selecciona"
            />
        </div>
    `,
})
export class FieldSelectComponent
    implements OnInit, ControlValueAccessor, Validator
{
    #apiUrl: string = env.api;
    @Input({ required: true }) url!: string;
    @Input({ required: true }) label?: string;
    @Input() required = false;

    options: ISelectResponse[] = [];
    disabled = false;

    internalControl = new FormControl();

    private onChange = (_: any) => {};
    private onTouched = () => {};

    private http = inject(HttpClient);

    ngOnInit() {
        this.http
            .get<IBaseResponse<ISelectResponse>>(`${this.#apiUrl}${this.url}`)
            .subscribe((res) => {
                if (res.isSuccess && Array.isArray(res.data)) {
                    this.options = res.data;
                }
            });

        this.internalControl.valueChanges.subscribe((val) => {
            this.onChange(val);
            this.onTouched();
        });

        if (this.required) {
            this.internalControl.addValidators(Validators.required);
        }
    }

    writeValue(obj: any): void {
        this.internalControl.setValue(obj, { emitEvent: false });
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
            this.internalControl.disable();
        } else {
            this.internalControl.enable();
        }
    }

    validate() {
        return this.internalControl.errors;
    }
}
