import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/passwordMatch.directive';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const value = this.loginForm.value
    const user = new User(value.username,"", value.password)
    this.authService.login(user)
  }
}
