import { IOptions } from '../signature_pad/signature_pad';

export interface SignaturePadOptions extends IOptions {
  trimSignature?: boolean;
  trimMargin?: number;
}
