import { InMemoryCustomDbService } from './services/in-memory-custom-db.service';
import { AppStoreModule } from './store/app-store/app-store.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseService } from './services/firebase.service';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    AuthFormComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyD4eUkM9D2WssAA_QGueDGUEaGhKJuOvO0',
      authDomain: 'fir-auth-85812.firebaseapp.com',
      projectId: 'fir-auth-85812',
      storageBucket: 'fir-auth-85812.appspot.com',
      messagingSenderId: '715994717464',
      appId: '1:715994717464:web:32f236090c336f56fbd26d',
    }),
    AngularFireAuthModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryCustomDbService,{dataEncapsulation: false}),
    AppStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    ReactiveFormsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
