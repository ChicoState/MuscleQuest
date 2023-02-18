import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SloaneLvlOneComponent } from './sloane-lvl-one/sloane-lvl-one.component';

const routes: Routes = [
  {
    path: 'sloane-lvl-one',
    component: SloaneLvlOneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
