### Angular MultiSelect DropDown

It as an multiselect, single select dropdown where you can set options as an array of objects with different keys for value to be displayed as options and get the corresponding different value as result.

### Installation
`npm install angular-multiselect-dropdown ng4-click-outside`

### Usage
import the SeedModule from angular-multiselect-dropdown in the module where you want to use it

**app.module.ts**
`import { BrowserModule } from '@angular/platform-browser';`
`import { NgModule} from '@angular/core';`
`import { AppComponent } from './app.component';`
`import { SeedModule } from 'angular-multiselect-dropdown';`

`@NgModule({`
`...`
`imports: [
    BrowserModule,
    SeedModule
  ],`

Then define an array of objects in the component. Where each object contains two key value pair. One key is for the display value on the dropdown. The other key is for the corresponding value to be received after selecting a particular display value on the dropdown.

**app.component.ts**
`options = [
    {name:"key1",value: "abc"}
  ]`

**app.component.html**
`<ns-dropdown [options]="options" [mode]="'multiSelect'" [valueField]="'name'" [textField]="'value'"></ns-dropdown>`