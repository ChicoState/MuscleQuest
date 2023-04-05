import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelsComponent } from './start-screen/levels/levels.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { SloaneLvlOneComponent } from './sloane-lvl-one/sloane-lvl-one.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrcBossComponent } from './orc-boss/orc-boss.component';
import { IsaLevelComponent } from './isa-level/isa-level.component';
import { BackDayComponent } from './isa-level/back-day/back-day.component';
import { ChestDayComponent } from './isa-level/chest-day/chest-day.component';
import { LegDayComponent } from './isa-level/leg-day/leg-day.component';
import { ShopComponent } from './shop/shop.component';
import { CharacterScreenComponent } from './character-screen/character-screen.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartScreenComponent },
  { path: 'sloane-lvl-one', component: SloaneLvlOneComponent },
  { path:'levels', component: LevelsComponent},
  { path: 'inventory', component: InventoryComponent },
  { path: 'orc-boss', component: OrcBossComponent },
  { path: 'isa-level', component: IsaLevelComponent},
  { path: 'back-day', component: BackDayComponent},
  { path: 'chest-day', component: ChestDayComponent},
  { path: 'leg-day', component: LegDayComponent},
  { path: 'shop', component: ShopComponent },
  {path: 'character-screen', component: CharacterScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
