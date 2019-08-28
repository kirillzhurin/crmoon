import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class FileReaderService {
  getBase64(file: File, callback: (result: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result.toString()));
    reader.readAsDataURL(file);
  }
}
