import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAll(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/order`, {
      params: new HttpParams({ fromObject: params })
    })
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/order/${id}`);
  }

  create(data: any): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/order`, data);
  }


}
