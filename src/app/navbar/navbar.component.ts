import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private sessionService: SessionService, private router: Router) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.sessionService.getLoggedInUsername();
    console.log("esta loged?" , this.isLoggedIn);
  }

  home(): void {
    this.router.navigate(['/inici']);
  }

  events(): void {
    this.router.navigate(['/events']);
  }

  programs(): void{
  if (!this.isLoggedIn) {
    console.log("valor de isloggedIn al llamar a programs", this.isLoggedIn);
        alert('Has d\'iniciar sessió per accedir a aquesta funcionalitat.');
      } else {
        // Aquí puedes añadir la lógica para navegar a la página de "merxandatge"
        this.router.navigate(['/programes']);
      }
  }
  
  gallery(): void {
    this.router.navigate(['/galeria']);
  }

  about(): void {
    this.router.navigate(['/about']);
  }

  contact(): void {
    this.router.navigate(['/contact']);
  }
  merchan(): void {
    this.router.navigate(['/merxandatge']);
  }
}
