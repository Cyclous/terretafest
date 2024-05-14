import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SessionService } from './services/session.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  username: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    FormsModule,
    FontAwesomeModule,
    
  ],
})


export class AppComponent {

  API_URL = 'http://127.0.0.1:5000'; // Declare API_URL as a class property

  formData: { email: string, password: string } = { email: '', password: '' };
  formDataRegister: { username: string, email: string, password: string, confirmPassword: string } = { username: '', email: '', password: '', confirmPassword: '' };


  constructor(private http: HttpClient, private sessionService: SessionService) {
    
    this.loggedInUsername = this.sessionService.getLoggedInUsername() || '';
  }

  title = 'terretafest_project';
  showScrollButton: boolean = false;
  isLoggedIn: boolean = false;
  isLoginFormOpen : boolean = false;
  isRegisterFormOpen : boolean = false;
  loggedInUsername : string = "";
  showDropdown : boolean = false;
  loginError: string = '';
  registerError: string = '';

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const scrollTrigger = 100;
    this.showScrollButton = yOffset > scrollTrigger;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openLogin(): void {
    console.log('Opening login form');
    this.isLoginFormOpen = true;
  }
  
  openRegister(): void {
    console.log('Opening register form');
    this.isRegisterFormOpen = true;
  }

  closeLogin(): void {
    console.log('Closing login form');
    this.isLoginFormOpen = false;
  }
  login(email: string, password: string): void {
    const url = this.API_URL + "/login";
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);
  
    this.http.post<LoginResponse>(url, body).subscribe(
      (response) => {
        console.log('Server response:', response);
        if (response.username) {
          this.sessionService.login(response.username); // Almacenar el nombre de usuario en localStorage
          this.loggedInUsername = response.username;
          this.isLoginFormOpen = false;
          this.loginError = '';
        } else {
          console.error('Respuesta login:', response);
          this.loginError = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
      },
      (error) => {
        console.error('Error logging in:', error);
        if (error.error && error.error.error) {
          this.loginError = error.error.error;
        } else {
          this.loginError = 'Error desconocido';
        }
      }
    );
  }

  logout() {
    this.sessionService.logout(); // Eliminar el nombre de usuario al cerrar sesión
    this.loggedInUsername = '';
  }
  
  register(username: string, email: string, password: string, confirmPassword: string): void {
    // Verificar si algún campo está vacío
    if (!username || !email || !password || !confirmPassword) {
      this.registerError = 'Por favor, completa todos los campos';
      return;
    }
  
    // Verificar el formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      this.registerError = 'Formato de email incorrecto';
      return;
    }
  
    // Verificar longitud del nombre de usuario
    if (username.length < 5) {
      this.registerError = 'El nombre de usuario debe tener al menos 5 caracteres';
      return;
    }
  
    // Verificar longitud de la contraseña
    if (password.length < 8) {
      this.registerError = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }
  
    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      this.registerError = 'Las contraseñas no coinciden';
      return;
    }
  
    // Construir el cuerpo de la solicitud
    const body = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
  
    // Enviar la solicitud al backend Flask
    this.http.post(this.API_URL + '/register', body).subscribe(
      (response) => {
        console.log('Server response:', response);
        this.registerError = '';
        this.isRegisterFormOpen = false;
      },
      (error) => {
        console.error('Error registering:', error);
        this.registerError = 'Error desconocido'; 
      }
    );
  }
  
  
  
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    this.isLoginFormOpen = false;
  }
  
}