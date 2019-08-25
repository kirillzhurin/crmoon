import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Product from '../models/product';
import { environment } from 'src/environments/environment';
import { FormDataService } from '../utils/form-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.API_URL + '/product';

  constructor(
    private http: HttpClient,
    private formDataService: FormDataService
  ){}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(data: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, data);
  }

  update(data): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${data.id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
