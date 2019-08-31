import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import Order from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ){}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/order`);
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/order/${id}`);
  }

  create(data: any): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/order`, data);
  }


}
