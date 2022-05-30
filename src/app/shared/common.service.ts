import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isDate(input: any): boolean {
    if (Object.prototype.toString.call(input) === "[object Date]")
      return true;
    return false;
  };

  getFormIdFromTypeFormUrl(url: string) : string {
    const pattern = /(https?:\/\/)?(www\.)?([^& \n<]+)(typeform.com\/to\/)([^& \n<]+)?/g;
    if(!url || !url.match(pattern)) return '';
    let array = url.split(/typeform.com\/to\//g);
    return array.length == 1 ? array[0] : array[1].split('?')[0];
  }

  convertTimeStampToDate(obj: any) : Date {
   return new Date((obj.seconds || obj._seconds) * 1000);
  }
}