import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Category from '../models/category';
import { FormDataService} from '../utils';
import { environment } from '../../../environments/environment';

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
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/${id}`);
  }

  create(data: any): Observable<Category> {
    const formData = this.formDataService.create(data);
    return this.http.post<Category>(`${this.baseUrl}/category`, formData);
  }

  update(data: any): Observable<Category> {
    const formData = this.formDataService.create(data);
    return this.http.patch<Category>(`${this.baseUrl}/category/${data.id}`, formData);
  }

  delete(id):Observable<any> {
    return this.http.delete(`${this.baseUrl}/category/${id}`);
  }
}
