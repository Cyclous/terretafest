import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

 // Texto de la política de privacidad en valenciano
 privacyPolicyText: string = `TerretaFest valora i respecta la privadesa dels seus usuaris. Totes les dades recopilades a través d'aquest formulari s'utilitzen únicament per respondre a les vostres consultes i no es comparteixen amb tercers sense el vostre consentiment explícit. En proporcionar la vostra informació de contacte, accepteu que TerretaFest puga utilitzar-la per respondre a la vostra consulta.
  
 En enviar aquest formulari, accepteu la nostra Política de Privadesa i els Termes d'Ús.`;
  constructor() { }

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

    // Event listener para el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Formulari enviat correctament');
      });
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
}
