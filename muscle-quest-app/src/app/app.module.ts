import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SloaneLvlOneComponent } from './sloane-lvl-one/sloane-lvl-one.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { LevelsComponent } from './start-screen/levels/levels.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrcBossComponent } from './orc-boss/orc-boss.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { OrcBossInfoComponent } from './orc-boss-info/orc-boss-info.component';
import { ShopComponent } from './shop/shop.component';
import { DailyQuestsComponent } from './daily-quests/daily-quests.component';
import { IsaLevelComponent } from './isa-level/isa-level.component';
import { BackDayComponent } from './isa-level/back-day/back-day.component';
import { ChestDayComponent } from './isa-level/chest-day/chest-day.component';
import { LegDayComponent } from './isa-level/leg-day/leg-day.component';
import { CharacterScreenComponent } from './character-screen/character-screen.component';
import { SloaneRewardDisplayComponent } from './sloane-reward-display/sloane-reward-display.component';

// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FirebaseDemoComponent } from './firebase-demo/firebase-demo.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { SloaneUserUpdateService } from './sloane-user-updater.service';
// SVG icons
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';
import { DecoratedButtonComponent } from './decorated-button/decorated-button.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    SloaneLvlOneComponent,
    LevelsComponent,
    InventoryComponent,
    OrcBossComponent,
    OrcBossInfoComponent,
    IsaLevelComponent,
    BackDayComponent,
    ChestDayComponent,
    LegDayComponent,
    ShopComponent,
    DailyQuestsComponent,
    CharacterScreenComponent,
    SloaneRewardDisplayComponent,
    FirebaseDemoComponent,
    UserAuthenticationComponent,
    DecoratedButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    // Material Components
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    // SVG icons
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: './assets/icon/icons.json',
    }),

    //Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    SloaneUserUpdateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
