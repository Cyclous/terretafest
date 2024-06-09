import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GoogleMapsModule } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Event {
  id: number;
  Nombre_del_Evento: string;
  Ubicacion: string;
  Grupo_de_Musica: string;
  N_de_Entradas?: number;
  Precio?: number;
  Imagen?: string;
  Fecha?: string;
  Informacion: string;
  Coordenadas?: {
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
  Nombre_del_Evento: string = '';
  Ubicacion: string = '';
  Grupo_de_Musica: string = '';
  N_de_Entradas: number = 0;
  Precio: number = 0;
  Imagen: string = '';
  Fecha: string = '';
  Informacion: string = '';
  Coordenadas: { latitud: number; longitud: number } = { latitud: 0, longitud: 0 };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.http.get<Event[]>('http://localhost:5000/eventos').subscribe(data => {
        const selectedEvent = data.find(event => event.id === +this.id);
        if (selectedEvent) {
          this.Nombre_del_Evento = selectedEvent.Nombre_del_Evento;
          this.Ubicacion = selectedEvent.Ubicacion;
          this.Grupo_de_Musica = selectedEvent.Grupo_de_Musica;
          this.N_de_Entradas = selectedEvent.N_de_Entradas || 0;
          this.Precio = selectedEvent.Precio || 0;
          this.Imagen = selectedEvent.Imagen || '';
          this.Fecha = selectedEvent.Fecha || '';
          this.Informacion = selectedEvent.Informacion;
          this.Coordenadas = selectedEvent.Coordenadas || { latitud: 0, longitud: 0 };
        } 
      });
    });
  }

  getGoogleMapUrl(): SafeResourceUrl {
    const url = `https://www.google.com/maps/embed/v1/view?zoom=17&center=${this.Coordenadas.latitud},${this.Coordenadas.longitud}&key=AIzaSyA8cxIg7Kc1lmWRH8qdNqecxT-aX8ZqTUg`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
