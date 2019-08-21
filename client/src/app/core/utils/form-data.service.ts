import { Injectable } from '@angular/core'
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  constructor() {}

  create(data: any = {}): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (!isUndefined(data[key])) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  }
}
