import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelsComponent } from './start-screen/levels/levels.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { SloaneLvlOneComponent } from './sloane-lvl-one/sloane-lvl-one.component';
import { OrcBossComponent } from './orc-boss/orc-boss.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartScreenComponent },
  { path: 'sloane-lvl-one', component: SloaneLvlOneComponent },
  { path:'levels', component: LevelsComponent},
  { path: 'orc-boss', component: OrcBossComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
