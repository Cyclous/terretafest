import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-programes',
  standalone: true,
  imports: [],
  templateUrl: './programes.component.html',
  styleUrl: './programes.component.css'
})
export class ProgramesComponent {
  isLoggedIn: boolean = false;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.sessionService.getLoggedInUsername();
  }
}

