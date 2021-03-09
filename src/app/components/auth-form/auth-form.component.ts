import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.firebaseService.isLoggedIn) this.router.navigate(['/home']);
  }

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  async onSignUp() {
    await this.firebaseService.singUp(
      this.signUpForm.value.email,
      this.signUpForm.value.password,
      this.signUpForm.value.name
    );
    if (this.firebaseService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  async onSignIn() {
    await this.firebaseService.singIn(
      this.signInForm.value.email,
      this.signInForm.value.password
    );
    if (this.firebaseService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  async onGoogleSignIn() {
    await this.firebaseService.createUserViaGoogle();
    if (this.firebaseService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }
}
