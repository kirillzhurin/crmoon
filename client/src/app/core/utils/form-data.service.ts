import { Injectable } from '@angular/core'
import { isUndefined, isArray } from 'util';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {

  create(data: any = {}): FormData {
    const formData = new FormData();
    Object.keys(data).map((key) => {
      if (isUndefined(data[key])) {
        return;
      }
      if (isArray(data[key])) {
        data[key].map((item) => formData.append(key, item));
        return;
      }
      formData.append(key, data[key]);
    });
    return formData;
  }
}
