import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {
  error: String
  subscription: Subscription;
  constructor(private authService: AuthenticationService){
    this.subscription = authService.errorMessage.subscribe(msg => {
      this.error = msg
    })
    
  }

}
