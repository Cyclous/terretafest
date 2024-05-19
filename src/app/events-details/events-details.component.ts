import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GeocodingService } from '../geocoding.service';
import { GoogleMap } from '@angular/google-maps'; // Importa el servicio de geocodificación
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Loader } from "@googlemaps/js-api-loader"

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
}

@Component({
  selector: 'app-events-details',
  standalone: true,
  imports:[GoogleMap,GoogleMapsModule,CommonModule,],
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
  coordenadas: { lat: number, lng: number } = { lat: 0, lng: 0 }; // Definición de coordenadas

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private geocodingService: GeocodingService // Inyecta el servicio de geocodificación
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.http.get<Event[]>('assets/eventsData.json').subscribe(data => {
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

          this.geocodingService.getCoordinates(this.Ubicacion).subscribe(
            {
              next: resp => {
                if (resp && resp.results && resp.results.length > 0) {
                  const geometry = resp.results[0].geometry;
                  if (geometry && geometry.location) {
                    const location = geometry.location;
                    this.coordenadas = { lat: location.lat, lng: location.lng };
                  }
                }
              },
              error: err => {
                console.error('Error al llamar al servicio de geocodificación:', err);
              }
           });         
        } 
      });
    });
    
    // Carga intercalada con la etiqueta <script>
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places,visualization&key=TU_API_KEY&v=weekly&callback=initMap';
    document.body.appendChild(script);
  }
}