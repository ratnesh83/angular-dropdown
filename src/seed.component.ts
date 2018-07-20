import { Component, Input, Inject, ViewChildren, QueryList, forwardRef, Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import * as _ from 'underscore';

import { SeedService } from './seed.service';

@Component({
    selector: 'ns-dropdown',
    template: `<div (clickOutside)="onClickedOutside($event)" class="dropDownWidth">
    <div>
        <div class="selector-width serif" (click)="dropDownOpen=!dropDownOpen">
            <div>
                <p *ngIf="(mode == 'multiSelect') && value">{{value.length}} SELECTED</p>
                <p *ngIf="(mode == 'singleSelect') && value">{{value | uppercase}}</p>
                <p *ngIf="!value">SELECT</p>
            </div>
        </div>
    </div>
    <div class="dropDownContent" *ngIf="dropDownOpen">
        <div style="padding:16px">
            <input style="width:100%;height:30px" type="search" [(ngModel)]="textValue" placeholder="Search...">
        </div>
        <ul class="list-styling">
            <li class="option-style pointer" (click)="changeModel(option)" *ngFor="let option of options | searchFilter : textField : textValue ; let i = index">
                <div class="squaredFour">
                    <input (click)="changeModel(option)" [attr.id]="'squaredfour_'+i+option[valueField]" [type]="'checkbox'" [checked]="option.isSelected"
                        text="option[valueField]" />
                    <label [attr.for]="'squaredfour_'+i"></label>
                    <div class="option-text">{{option[textField]}}</div>
                </div>
            </li>
        </ul>
    </div>
</div>`,
    styles:[`.option-style {
        list-style: none;
        padding: 10px;
      }
      .squaredFour {
        position: relative;
        display: inline;
      }
      .squaredFour label {
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        background: #fcfff4;
        background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
        border-radius: 4px;
        box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);
      }
      .squaredFour label:after {
        content: '';
        width: 9px;
        height: 5px;
        position: absolute;
        top: 4px;
        left: 4px;
        border: 3px solid #333;
        border-top: none;
        border-right: none;
        background: transparent;
        opacity: 0;
        transform: rotate(-45deg);
      }
      .squaredFour label:hover::after {
        opacity: 0.5;
      }
      .squaredFour input[type=checkbox] {
        visibility: hidden;
      }
      .squaredFour input[type=checkbox]:checked + label:after {
        opacity: 1;
      }
      .option-text {
        display: inline;
        padding-left: 10px;
        font-size: 15px;
        font-family: sans-serif;
      }
      .selector-width {
        border: 1px solid #000;
        width: 100%;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        text-align: center;
        line-height: 24px;
        border: 1px solid #e5e5e5;
        color: #666;
      }
      .selector-width > div {
        display: table;
        width: 100%;
        height: 100%;
      }
      .selector-width > div > p {
        display: table-cell;
        vertical-align: middle;
      }
      .selector-width:hover {
        -moz-box-shadow: inset 0 0 5px #b5b5b5;
        -webkit-box-shadow: inset 0 0 5px #b5b5b5;
        box-shadow: inset 0 0 5px #b5b5b5;
      }
      .name-style {
        display: inline;
      }
      .dropDownContent {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        position: absolute;
        background-color: white;
        width: 100%;
      }
      .list-styling {
        padding: 6px;
        margin: 0;
        overflow-y:auto;
        max-height:350px;
      }
      .dropDownWidth {
        width: 100%;
        position: relative;
      }
      .serif {
        font-family: serif;
      }
      .pointer {
        cursor: pointer;
      }
      .option-style:hover {
        background-color: #b5b5b5;
        border-radius: 2px;
      }
    `],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SeedComponent),
            multi: true
        }
	]
})
export class SeedComponent implements ControlValueAccessor {
    dropDownOpen = false;
    modelValue: any = {};
    @Input() valueField: string;
    @Input() textField: string;
    @Input() disabled: boolean;
    @Output() onSelectionChange = new EventEmitter<any>();

    private _options: any[];
    @Input() get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
        this.setValue(this.modelValue);
    }
    private _mode:any;
    @Input() get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
    }
    get selectedCount() {
        return '';
    }
    constructor() {
    }
    onClickedOutside(e: Event) {
        if (this.dropDownOpen) {
            this.dropDownOpen = false;
        }
    }

    // Function to call when the rating changes.
    onChange = (selectedValues: string[]) => {

    }

    // Function to call when the input is touched (when a star is clicked).
    onTouched = () => {
    }
    get value(): any {
        if (this.mode === 'multiSelect') {
            return _.pluck(_.where(this.options, { 'isSelected': true }), this.valueField);
        } else {
            const vals = _.pluck(_.where(this.options, { 'isSelected': true }), this.valueField);
            if (vals.length > 0) {
                return vals[0];
            } else {
                return '';
            }
        }
    }
    setValue(selectedValues:any) {
        this.modelValue = selectedValues;
        const keyFields = _.pluck(this.options, this.valueField);
        if (selectedValues) {
            if (this.mode === 'multiSelect') {
                selectedValues.forEach((opt:any) => {
                    const indexOfOption = keyFields.indexOf(opt);
                    if (indexOfOption !== -1) {
                        this.options[indexOfOption]['isSelected'] = true;
                    }
                });
            } else {
                const indexOfOption = keyFields.indexOf(selectedValues);
                if (indexOfOption !== -1) {
                    this.options[indexOfOption]['isSelected'] = true;
                }
            }
        }
    }
    changeModel(option:any) {
        const tempVal = option['isSelected'];
        if (this.mode !== 'multiSelect') {
            this.options.forEach(function (opt) {
                opt['isSelected'] = false;
            });
        }
        option['isSelected'] = !tempVal;
        this.onChange(this.value);
        this.onSelectionChange.emit(option);
    }
    writeValue(value:any): void {
        if (value !== undefined) {
            this.setValue(value);
        }

    }
    // Allows Angular to register a function to call when the model (rating) changes.
    // Save the function as a property to call later here.
    registerOnChange(fn: (selectedValues: string[]) => void): void {
        this.onChange = fn;
    }

    // Allows Angular to register a function to call when the input has been touched.
    // Save the function as a property to call later here.
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    // Allows Angular to disable the input.
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
