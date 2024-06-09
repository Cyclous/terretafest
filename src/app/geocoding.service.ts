// geocoding.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) { }

  getCoordinates(address: string): Observable<any> {
    const params = {
      address: address,
      key: 'AIzaSyAp7sMfUvz0ZCTtNBsiiVG_RBqBvwCF3Ws'
    };
    console.log(address);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
