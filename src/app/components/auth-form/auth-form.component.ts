import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/app-store/user/user.actions';
import * as fromUser from '../../store/app-store/user/user.selectors';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(fromUser.getSignedIn).subscribe((isLoggedIn) => {
      isLoggedIn ? this.router.navigate(['/home']) : null;
    });
    this.firebaseService.getCurrentUserInfo().subscribe((ui)=>console.log(ui))
    this.firebaseService.getCurrentUser().subscribe((u)=>console.log(u))
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
    this.store.dispatch(UserActions.signUp({ input: this.signUpForm.value }));
  }

  onSignIn() {
    this.store.dispatch(UserActions.signIn({ input: this.signInForm.value }));
  }

  onGoogleSignIn() {
    this.store.dispatch(UserActions.signInViaSocial());
  }
}
