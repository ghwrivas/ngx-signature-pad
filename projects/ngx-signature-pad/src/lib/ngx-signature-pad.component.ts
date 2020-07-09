// tslint:disable: variable-name
import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import SignaturePad from './signature_pad/signature_pad';
import { SignaturePadOptions } from './models/signature-pad-options';

@Component({
  selector: 'ngx-signature-pad',
  template: '<canvas [width]="_width" [height]="_height" style="touch-action: none;"></canvas>',
  styles: []
})
export class NgxSignaturePadComponent implements OnInit, AfterViewInit {

  public _width = 200;
  public _height = 200;
  public _options: SignaturePadOptions = {};

  private _canvas: any;
  private _signaturePad: any;

  @Input() set options(options: SignaturePadOptions) {
    this._options = options;
    if (this._signaturePad) {
      this._signaturePad = new SignaturePad(this._canvas, this._options || {});
    }
  }

  @Input() set width(value: number) {
    this._width = value;
  }

  @Input() set height(value: number) {
    this._height = value;
  }

  constructor(
    private _el: ElementRef
  ) { }

  ngOnInit() {
    if (this.options) {
      this._options = this.options;
    }
  }

  ngAfterViewInit(): void {
    this._canvas = this._el.nativeElement.querySelector('canvas');
    this._signaturePad = new SignaturePad(this._canvas, this._options || {});
  }

  toDataURL(type = null): string {
    if (this._options.trimSignature) {
      return this.trimCanvas().toDataURL('image/png');
    }
    return this._signaturePad.toDataURL(type);
  }

  fromDataURL(data: string): void {
    this._signaturePad.fromDataURL(data);
  }

  toData(): any {
    return this._signaturePad.toData();
  }

  fromData(data: any): void {
    this._signaturePad.fromData(data);
  }

  clear(): void {
    this._signaturePad.clear();
  }

  isEmpty(): boolean {
    return this._signaturePad.isEmpty();
  }

  off(): void {
    this._signaturePad.off();
  }

  on(): void {
    this._signaturePad.on();
  }

  private trimCanvas() {
    const ctx = this._canvas.getContext('2d');
    const copy = document.createElement('canvas').getContext('2d');
    const pixels = ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
    const l = pixels.data.length;
    let i;
    const bound = { top: null, left: null, right: null, bottom: null };
    let x;
    let y;
    for (i = 0; i < l; i += 4) {
      if (pixels.data[i + 3] !== 0) {
        x = (i / 4) % this._canvas.width;
        // tslint:disable-next-line: no-bitwise
        y = ~~((i / 4) / this._canvas.width);
        if (bound.top === null) {
          bound.top = y;
        }
        if (bound.left === null) {
          bound.left = x;
        } else if (x < bound.left) {
          bound.left = x;
        }
        if (bound.right === null) {
          bound.right = x;
        } else if (bound.right < x) {
          bound.right = x;
        }
        if (bound.bottom === null) {
          bound.bottom = y;
        } else if (bound.bottom < y) {
          bound.bottom = y;
        }
      }
    }
    const trimMargin = this._options.trimMargin ? this._options.trimMargin : 0;
    const trimHeight = bound.bottom - bound.top + (trimMargin * 2);
    const trimWidth = bound.right - bound.left + (trimMargin * 2);
    const trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, trimMargin, trimMargin);
    return copy.canvas;
  }
}
