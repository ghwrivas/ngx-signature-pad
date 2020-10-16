# NgxSignaturePad

Angular 8 component for [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Install
`npm install @williamsrivas/ngx-signature-pad --save`

## Usage example

API is identical to [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

```typescript

// import into app module

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSignaturePadModule } from 'ngx-signature-pad';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSignaturePadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// then import for use in a component

import { Component, ViewChild } from '@angular/core';
import { SignaturePadOptions } from 'ngx-signature-pad';

@Component({
  selector: 'app-root',
  templateUrl: `<div style="border:1px solid red" [style.width]="width+'px'" [style.height]="height+'px'">

  <ngx-signature-pad #signaturePad [options]="options" [width]="width" [height]="height"></ngx-signature-pad>

</div>

<input type="button" value="Clear" (click)="clear()" />

<input type="button" value="Check Empty" (click)="isEmpty()" />

<input type="button" value="Save png" (click)="savePng()" />

<input type="button" value="Save jpg" (click)="saveJpg()" />

<input type="button" value="Save svg" (click)="saveSvg()" />

<input type="button" value="Save array" (click)="saveArray()" />

<input type="button" value="Change draw style" (click)="changeOptions()" />`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('signaturePad', { static: false }) signaturePad;

  width = 600;
  height = 300;
  options: SignaturePadOptions = { trimSignature: true, trimMargin: 20 };

  constructor() { }

  isEmpty() {
    console.log('is empty', this.signaturePad.isEmpty());
  }

  savePng() {
    const data = this.signaturePad.toDataURL();
    console.log(data);
  }

  saveJpg() {
    const data = this.signaturePad.toDataURL('image/jpeg');
    console.log(data);
  }

  saveSvg() {
    const data = this.signaturePad.toDataURL('image/svg+xml');
    console.log(data);
  }

  saveArray() {
    const data = this.signaturePad.toData();
    console.log(data);
    console.log(JSON.stringify(data));
  }

  clear() {
    console.log('clear');
    this.signaturePad.clear();
  }

  changeOptions() {
    console.log('options changed');
    this.options = {
      minWidth: 5,
      maxWidth: 10,
      penColor: 'rgb(66, 133, 244)'
    };
  }

}
```
