import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { reducers, metaReducers } from './';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

//import { EventsEffects } from './events/effects/events.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //EffectsModule.forFeature([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    //StoreModule.forRoot(reducers,{metaReducers})
  ]
})
export class AppStoreModule { }
