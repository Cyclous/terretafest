import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EventsComponent } from './events/events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NewsDetailComponent } from './new-detail/new-detail.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { ProgramesComponent } from './programes/programes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inici', pathMatch: 'full' }, // Redirecciona la ruta vacía a /home

  { path: 'inici', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'programes', component: ProgramesComponent },
  { path: 'galeria', component: GalleryComponent },
  { path: 'event/:id', component: EventsDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'noticia/:id', component: NewsDetailComponent },
  { path: 'recuperarContrassenya', component: ForgotPasswordComponent },
];
