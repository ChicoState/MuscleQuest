import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { SloaneLvlOneComponent } from './sloane-lvl-one/sloane-lvl-one.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrcBossComponent } from './orc-boss/orc-boss.component';
import { ShopComponent } from './shop/shop.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { FirebaseDemoComponent } from './firebase-demo/firebase-demo.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin: any = () =>
  redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  {
    path: 'start',
    component: StartScreenComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: 'sloane-lvl-one', component: SloaneLvlOneComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'orc-boss', component: OrcBossComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: UserAuthenticationComponent },
  { path: 'demo', component: FirebaseDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
