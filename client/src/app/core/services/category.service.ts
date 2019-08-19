import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Category from '../models/category';
import { environment } from '../../../environments/environment';
import { FormDataService } from '../utils/form-data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private formDataService: FormDataService
  ){}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/api/category`);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/api/category/${id}`);
  }

  create(name: string, image?: File): Observable<Category> {
    const formData = this.formDataService.create({ name, image });
    return this.http.post<Category>(`${this.baseUrl}/api/category`, formData);
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const formData = this.formDataService.create({ name, image });
    return this.http.patch<Category>(`${this.baseUrl}/api/category/${id}`, formData);
  }

  delete(id):Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/category/${id}`);
  }
}
