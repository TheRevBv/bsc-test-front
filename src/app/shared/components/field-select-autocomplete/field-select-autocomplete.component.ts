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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IBaseResponse, ISelectResponse } from '~/shared';
import { environment as env } from '~envs/enviroment';

@Component({
    selector: 'bsc-field-select-autocomplete',
    standalone: true,
    imports: [CommonModule, AutoCompleteModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FieldSelectAutocompleteComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FieldSelectAutocompleteComponent),
            multi: true,
        },
    ],
    template: `
        <div class="w-full flex flex-col gap-2">
            <label *ngIf="label">{{ label }}</label>
            <p-autoComplete
                [formControl]="internalControl"
                [suggestions]="filtered"
                (completeMethod)="buscar($event)"
                [field]="'nombre'"
                [dropdown]="true"
                [disabled]="disabled"
                placeholder="Selecciona..."
            />
        </div>
    `,
})
export class FieldSelectAutocompleteComponent
    implements OnInit, ControlValueAccessor, Validator
{
    #apiUrl: string = env.api;
    @Input({ required: true }) url!: string;
    @Input({ required: true }) label?: string;
    @Input() required = false;

    fullData: ISelectResponse[] = [];
    filtered: any[] = [];
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
                    this.fullData = res.data;
                }
            });

        this.internalControl.valueChanges.subscribe((val) => {
            if (typeof val === 'object') {
                this.onChange(val?.id);
            } else {
                this.onChange(null);
            }
            this.onTouched();
        });

        if (this.required) {
            this.internalControl.addValidators(Validators.required);
        }
    }

    buscar = (event: any) => {
        const query = event.query?.toLowerCase() ?? '';
        this.filtered = this.fullData.filter((item) =>
            item.nombre.toLowerCase().includes(query),
        );
    };

    writeValue(value: any): void {
        if (!value) {
            this.internalControl.setValue(null, { emitEvent: false });
            return;
        }

        const match = this.fullData.find((r: any) => r.id === value);
        this.internalControl.setValue(match, { emitEvent: false });
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
