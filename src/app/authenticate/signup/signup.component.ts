import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { passwordMatchValidator } from '../../shared/passwordMatch.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private authService: AuthenticationService) {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    {validators: passwordMatchValidator});
  }

  onSubmit() {
    const value = this.signupForm.value
    const user = new User(value.username, value.email, value.password)
    this.authService.signup(user)
  }
}
