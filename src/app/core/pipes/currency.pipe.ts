import { Pipe } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
@Pipe({
    name: 'currency',
    standalone: true
})
  export class currencyPipe  extends CurrencyPipe{

    override transform(value: string | number, currencyCode?: string | undefined, display?: string | boolean | undefined, digitsInfo?: string | undefined, locale?: string | undefined): string | null;
    override transform(value: null | undefined, currencyCode?: string | undefined, display?: string | boolean | undefined, digitsInfo?: string | undefined, locale?: string | undefined): null;
    override transform(value: string | number | null | undefined, currencyCode?: string | undefined, display?: string | boolean | undefined, digitsInfo?: string | undefined, locale?: string | undefined): string | null;
    override transform(value: unknown, currencyCode?: unknown, display?: unknown, digitsInfo?: unknown, locale?: unknown): string | null {
   
      if(locale=='ar')
        currencyCode='ج'
        return super.transform(value as string,currencyCode as string);
    }

    
   
  }