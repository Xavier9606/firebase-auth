import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducers, metaReducers } from './';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import * as fromUser from './user/user.reducer';
import { userFeatureKey } from './user/user.state';
import { UserEffects } from './user/user.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot([UserEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot(reducers,{metaReducers})
  ]
})
export class AppStoreModule { }
