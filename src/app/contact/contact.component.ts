import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { cami } from '../config';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  nombre: string = '';
  correo: string = '';
  asunto: string = '';
  mensaje: string = '';
  privacyPolicyAccepted: boolean = false;
  isFormSubmitted: boolean = false;
  url = cami.cami;

  // Texto de la política de privacidad en valenciano
  privacyPolicyText: string = `TerretaFest valora i respecta la privadesa dels seus usuaris. Totes les dades recopilades a través d'aquest formulari s'utilitzen únicament per respondre a les vostres consultes i no es comparteixen amb tercers sense el vostre consentiment explícit. En proporcionar la vostra informació de contacte, accepteu que TerretaFest puga utilitzar-la per respondre a la vostra consulta.
  
  En enviar aquest formulari, accepteu la nostra Política de Privadesa i els Termes d'Ús.`;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Método para mostrar el mensaje de la política de privacidad
    const openPrivacyPolicyModal = () => {
      const modal = document.getElementById('privacy-policy-modal');
      if (modal) {
        modal.style.display = 'block';
      }
    };

    // Método para cerrar el mensaje de la política de privacidad
    const closePrivacyPolicyModal = () => {
      const modal = document.getElementById('privacy-policy-modal');
      if (modal) {
        modal.style.display = 'none';
      }
    };

    // Event listener para el botón de la política de privacidad
    const privacyButton = document.getElementById('privacy-policy-button');
    if (privacyButton) {
      privacyButton.addEventListener('click', openPrivacyPolicyModal);
    }

    // Event listener para cerrar el modal de la política de privacidad al hacer clic fuera de él
    window.addEventListener('click', (event) => {
      const modal = document.getElementById('privacy-policy-modal');
      if (event.target === modal) {
        closePrivacyPolicyModal();
      }
    });

    // Event listener para cerrar el modal de la política de privacidad al hacer clic en la "X"
    const closeButton = document.querySelector('.close');
    if (closeButton) {
      closeButton.addEventListener('click', closePrivacyPolicyModal);
    }
  }

  // Método para mostrar el modal de la política de privacidad
  openPrivacyPolicyModal(): void {
    const modal = document.getElementById('privacy-policy-modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Método para cerrar el modal de la política de privacidad
  closePrivacyPolicyModal(): void {
    const modal = document.getElementById('privacy-policy-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  enviarCorreo(contactForm: NgForm): void {
    // Marcar el formulario como enviado para mostrar mensajes de error si es necesario
    this.isFormSubmitted = true;

    if (contactForm.invalid) {
      // Si el formulario es inválido, no se envía
      return;
    }

    const formData = {
      nombre: this.nombre,
      correo: this.correo,
      asunto: this.asunto,
      mensaje: this.mensaje
    };

    this.http.post(this.url + 'enviar-correo', formData)
      .subscribe((response: any) => {
        console.log('Correu enviat exitosament:', response);
        // Restablecer los campos del formulario
        this.nombre = '';
        this.correo = '';
        this.asunto = '';
        this.mensaje = '';
        // Restablecer la aceptación de la política de privacidad
        this.privacyPolicyAccepted = false;
        // Redirigir al usuario a la página de inicio
        this.router.navigate(['/']); // Cambia '/home' por la ruta de la página de inicio
      }, (error: any) => {
        console.error('Ha hagut un error"', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      });
  }

  onSubmit(contactForm: NgForm): void {
    // Llamar al método enviarCorreo al enviar el formulario
    this.enviarCorreo(contactForm);
  }

  validateEmail(email: any): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email.value)) {
      email.setCustomValidity('');
    } else {
      email.setCustomValidity('Introdueix un correu electrònic vàlid.');
    }
  }
}
