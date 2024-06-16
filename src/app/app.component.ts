import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SessionService } from './services/session.service';
import { CartService } from './cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap } from '@angular/google-maps';
import { cami } from './config';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  username: string;
  role_id: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    FormsModule,
    FontAwesomeModule,
    GoogleMap,
  ],
})
export class AppComponent implements OnInit {
  API_URL = cami.cami;

  formData: { email: string, password: string } = { email: '', password: '' };
  formDataRegister: { username: string, email: string, password: string, confirmPassword: string } = { username: '', email: '', password: '', confirmPassword: '' };

  constructor(private http: HttpClient, private sessionService: SessionService, private cartService: CartService) {
    this.loggedInUsername = this.sessionService.getLoggedInUsername() || '';
  }

  title = 'terretafest_project';
  showScrollButton: boolean = false;
  isLoggedIn: boolean = false;
  isLoginFormOpen: boolean = false;
  isRegisterFormOpen: boolean = false;
  loggedInUsername: string = "";
  showDropdown: boolean = false;
  showCartDropdown: boolean = false; // Agregar esta propiedad
  loginError: string = '';
  registerError: string = '';
  role_id: number = 0;
  cartCount: number = 0;
  cartItems: any[] = []; // Agregar esta propiedad

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
    this.isRegisterFormOpen = false;
  }

  openRegister(): void {
    console.log('Opening register form');
    this.isRegisterFormOpen = true;
    this.isLoginFormOpen = false;
  }

  closePopUp(): void {
    console.log('Closing pop-up form');
    this.isLoginFormOpen = false;
    this.isRegisterFormOpen = false;
  }

  login(email: string, password: string): void {
    const url = this.API_URL + "/login";
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);

    this.http.post<LoginResponse>(url, body).subscribe(
      (response) => {
        console.log('Server response:', response);
        if (response.username && response.role_id !== undefined) {
          this.sessionService.login(response.username, response.role_id); // Almacenar el nombre de usuario y role_id en localStorage
          this.loggedInUsername = response.username;
          this.role_id = response.role_id;
          console.log(this.role_id)
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

  toggleCartDropdown(): void {
    this.showCartDropdown = !this.showCartDropdown;
  }

  clearCartAndCloseDropdown(): void {
    this.cartService.clearCart();
    this.toggleCartDropdown(); // Cierra el dropdown
  }
  
  removeItemFromCart(item: any) {
    // Restar 1 al contador
    this.cartCount -= 1;
  
    // Encuentra el índice del elemento en el array
    const index = this.cartItems.indexOf(item);
  
    // Si el elemento existe en el array, quítalo
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
  

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }
}
