import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cami } from './config';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = cami.cami + '/productos'; // URL del endpoint de Flask

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
