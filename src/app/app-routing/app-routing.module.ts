import { VogelsComponent } from './../views/vogels/vogels.component';
import { VogeltellerDetailComponent } from './../views/vogelteller-detail/vogelteller-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@Angular/router';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { NotfoundComponent } from '../views/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'vogelteller', component: VogeltellerDetailComponent},
  { path: 'vogels', component: VogelsComponent},
  { path: '404', component: NotfoundComponent},
  { path: '**', component: NotfoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
