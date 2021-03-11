import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/app-store/user/user.actions';
import * as fromUser from '../../store/app-store/user/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUserName: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(fromUser.getSignedIn).subscribe((loggedIn) => {
      loggedIn ? null : this.router.navigate(['/auth']);

      this.firebaseService.getToken().subscribe(token=>console.log(token))
    });

    this.store.select(fromUser.getUser).subscribe((user) => {
      user ? (this.currentUserName = user.displayName) : null;
    });
  }

  signOut() {
    this.store.dispatch(UserActions.signOut());
  }
}
