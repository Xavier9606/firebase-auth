import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUserName: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.firebaseService.isLoggedIn) this.router.navigate(['/auth']);
    else this.currentUserName = this.getCurrentUserName();
  }

  getCurrentUserName() {
    return this.firebaseService.getCurrentUser().displayName;
  }

  async logout() {
    await this.firebaseService
      .logOut()
      .then((res) => this.router.navigate(['/auth']));
  }

}
