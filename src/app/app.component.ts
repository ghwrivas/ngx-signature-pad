import { Component, ViewChild } from '@angular/core';
import { SignaturePadOptions } from 'ngx-signature-pad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
