import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../authenticate/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private authService: AuthenticationService){}

  isLoggedIn()
  {
    return this.authService.isLoggedIn()
  }

  logout()
  {
    this.authService.logout()
  }


}
