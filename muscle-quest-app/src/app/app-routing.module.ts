import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { SloaneLvlOneComponent } from './sloane-lvl-one/sloane-lvl-one.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrcBossComponent } from './orc-boss/orc-boss.component';
import { ShopComponent } from './shop/shop.component';
import { DailyQuestsComponent } from './daily-quests/daily-quests.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartScreenComponent },
  { path: 'sloane-lvl-one', component: SloaneLvlOneComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'orc-boss', component: OrcBossComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'daily-quests', component: DailyQuestsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
