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

  onSignUp() {
    this.firebaseService
      .signUp(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.name
      )
      .subscribe(() => {
        if (this.firebaseService.isLoggedIn) {
          this.router.navigate(['/home']);
        }
      });
  }

  onSignIn() {
    this.firebaseService
      .signIn(this.signInForm.value.email, this.signInForm.value.password)
      .subscribe(() => {
        if (this.firebaseService.isLoggedIn) {
          this.router.navigate(['/home']);
        }
      });
  }

  onGoogleSignIn() {
    this.firebaseService.signInViaGoogle().subscribe(() => {
      if (this.firebaseService.isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  getCurrentUser() {
    this.firebaseService.getCurrentUser().subscribe((user) => {
      console.log(user);
    });
  }
}
