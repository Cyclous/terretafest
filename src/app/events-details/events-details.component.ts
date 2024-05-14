import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Event {
  id: number;
  Nombre_del_Evento: string;
  Ubicacion: string;
  Grupo_de_Musica: string;
  N_de_Entradas?: number;
  Precio?: number;
  Imagen?: string;
  Fecha?: string;
  Informacion: string; // Corregido
}

@Component({
  selector: 'app-events-details',
  standalone: true,
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {

  id: number = 0;
  Nombre_del_Evento: string = '';
  Ubicacion: string =  '';
  Grupo_de_Musica: string = '';
  N_de_Entradas: number = 0;
  Precio: number = 0;
  Imagen: string = '';
  Fecha: string = '';
  Informacion: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

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
        } else {
          console.log('No se encontró ningún evento con el ID:', this.id);
        }
      });
    });
  }
}
