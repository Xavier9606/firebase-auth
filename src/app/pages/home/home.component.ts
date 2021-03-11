import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    //this.currentUserName = this.getCurrentUserName();
    //this.currentUserName=this.firebaseService.getCurrentUser().pipe(filter(res=>res!==null),map(user=>user.displayName));
    this.firebaseService.getCurrentUser().subscribe((res) => {
      //console.log(res);
      this.currentUserName = res.displayName;
    });
    // this.firebaseService.getAuthProvider().pipe(take(1)).subscribe((provider)=>console.log(provider));
  }

  getCurrentUserName() {
    //return this.firebaseService.getCurrentUser().displayName;
  }

  getCurrentUser() {
    this.firebaseService.getCurrentUser().subscribe((user) => {
      console.log(user);
    });
  }

  signOut() {
    this.firebaseService
      .signOut()
      .subscribe(() => this.router.navigate(['/auth']));
  }
}
