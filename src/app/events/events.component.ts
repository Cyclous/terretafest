import { Component, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from '@angular/material/toolbar';
import { cami } from '../config';
import { Event } from '../events-details/events-details.component';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule, MatIconModule,MatSidenavModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatToolbarModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  @ViewChild('drawer') drawer!: MatSidenav; // Solución al error ts(2564)
  eventForm!: FormGroup;
  editForm!:FormGroup;


  data: any = [];
  displayedData: any = [];
  itemsPerPage: number = 4;
  currentEvent: Event = {
    id: 0,
    Nombre_del_Evento: "",
    Ubicacion: "",
    Grupo_de_Musica: "",
    Informacion: ""
  } ;
  editingEventId: number | null = null;
  role_id: number = 0; // Declare role_id
  isDrawerOpened: boolean = false;
  url = cami.cami;
  @ViewChild('eventModal') eventModal: any;

  private sessionService = inject(SessionService); // Inject SessionService

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,private fb: FormBuilder) {}

  ngOnInit(): void {

    this.isDrawerOpened = false; // Variable para controlar el estado del drawer


    this.eventForm = this.fb.group({
      nombreEvento: [''],
      ubicacion: [''],
      grupoMusica: [''],
      numeroEntradas: [''],
      precio: [''],
      fecha: ['']
    });


     this.editForm = this.fb.group({
      id:[''],
      nombreEvento: [''],
      ubicacion: [''],
      grupoMusica: [''],
      numeroEntradas: [''],
      precio: [''],
      fecha: ['']
    });

    this.role_id = this.sessionService.getRoleId() || 0; // Get role_id from SessionService
    this.http.get(this.url +'/eventos').subscribe((data) => {
      this.data = data;
      this.displayedData = this.data.slice(0, this.itemsPerPage);
    });
  }

  loadMore(): void {
    const startIndex = this.displayedData.length;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.data.length);
    this.displayedData = this.displayedData.concat(
      this.data.slice(startIndex, endIndex)
    );
  }

  loadLess(): void {
    this.displayedData = this.data.slice(0, this.itemsPerPage);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollHeight = event.target.documentElement.scrollHeight;
    const scrollTop = event.target.documentElement.scrollTop;
    const clientHeight = event.target.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      this.loadMore();
    }
  }

  isPastEvent(eventDate: string): boolean {
    const [day, month, year] = eventDate.split('/').map(Number);
    const event = new Date(year, month - 1, day);
    const currentDate = new Date();
    return event < currentDate;
  }

  startEditing(event: any): void {
    this.editingEventId = event.id;
    this.currentEvent = { ...event };
    this.editForm.patchValue({
      id:this.currentEvent.id,
      nombreEvento: this.currentEvent.Nombre_del_Evento,
      ubicacion: this.currentEvent.Ubicacion,
      grupoMusica: this.currentEvent.Grupo_de_Musica,
      numeroEntradas: this.currentEvent.N_de_Entradas,
      precio: this.currentEvent.Precio,
      fecha: this.currentEvent.Fecha
    })
  }

  
  onFinishEditing() {
    if(this.editForm.valid){
      this.currentEvent={
        id:this.editForm.get("id")?.value,
        Nombre_del_Evento:this.editForm.get("nombreEvento")?.value,
        Ubicacion:this.editForm.get("ubicacion")?.value,
        Grupo_de_Musica:this.editForm.get("grupoMusica")?.value,
        N_de_Entradas:this.editForm.get("numeroEntradas")?.value,
        Precio:this.editForm.get("precio")?.value,
        Fecha:this.editForm.get("fecha")?.value
      }
     this.saveEvent();
    }
  }

  onCancelEdit(){
    this.editForm.reset
    this.editingEventId = null
  }

  saveEvent(): void {
    if (this.editingEventId) {
      this.http.put( this.url +`/eventos/${this.currentEvent.id}`, this.currentEvent).subscribe(() => {
        const index = this.data.findIndex((event: any) => event.id === this.currentEvent.id);
        if (index !== -1) {
          this.data[index] = {
            ...this.data[index],
            ...this.currentEvent
          }
        }
        this.displayedData = this.data.slice(0, this.itemsPerPage);
        this.editingEventId = null;
      });
    } else {
      this.http.post(this.url + 'eventos', this.currentEvent).subscribe((newEvent: any) => {
        this.data.push(newEvent);
        this.displayedData = this.data.slice(0, this.itemsPerPage);
      });
    }
    this.closeEventDrawer();
  }

  confirmDeleteEvent(event: any): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el evento "${event.Nombre_del_Evento}"?`)) {
      this.deleteEvent(event.id);
    }
  }

  deleteEvent(eventId: number): void {
    this.http.delete(this.url +`/eventos/${eventId}`).subscribe(() => {
      this.data = this.data.filter((event: any) => event.id !== eventId);
      this.displayedData = this.data.slice(0, this.itemsPerPage);
    });
  }

  openDrawer() {
    this.drawer.open();
  }
  
  // Método para cerrar el drawer
  closeEventDrawer(): void {
    this.isDrawerOpened = false;
  }
}
