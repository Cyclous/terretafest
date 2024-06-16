import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GoogleMapsModule } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { cami } from '../config';

export interface Event {
  id: number;
  nombreDelEvento: string;
  ubicacion: string;
  grupoDeMusica: string;
  numeroDeEntradas?: number;
  precio?: number;
  imagen?: string;
  fecha?: string;
  informacion?: string;
  coordenadas?: {
    latitud: number;
    longitud: number;
  };
}

@Component({
  selector: 'app-events-details',
  standalone: true,
  imports:[GoogleMapsModule],
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  id: number = 0;
  nombreDelEvento: string = '';
  ubicacion: string = '';
  grupoDeMusica: string = '';
  numeroDeEntradas: number = 0;
  precio: number = 0;
  imagen: string = '';
  fecha: string = '';
  informacion: string = '';
  coordenadas: { latitud: number; longitud: number } = { latitud: 0, longitud: 0 };
  url = cami.cami;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.http.get<Event[]>(this.url + '/eventos').subscribe(data => {
        const selectedEvent = data.find(event => event.id === +this.id);
        if (selectedEvent) {
          this.nombreDelEvento = selectedEvent.nombreDelEvento;
          this.ubicacion = selectedEvent.ubicacion;
          this.grupoDeMusica = selectedEvent.grupoDeMusica;
          this.numeroDeEntradas = selectedEvent.numeroDeEntradas || 0;
          this.precio = selectedEvent.precio || 0;
          this.imagen = selectedEvent.imagen || '';
          this.fecha = selectedEvent.fecha || '';
          this.informacion = selectedEvent.informacion || '';
          this.coordenadas = selectedEvent.coordenadas || { latitud: 0, longitud: 0 };
        } 
      });
    });
  }

  getGoogleMapUrl(): SafeResourceUrl {
    const url = `https://www.google.com/maps/embed/v1/view?zoom=17&center=${this.coordenadas.latitud},${this.coordenadas.longitud}&key=AIzaSyA8cxIg7Kc1lmWRH8qdNqecxT-aX8ZqTUg`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
