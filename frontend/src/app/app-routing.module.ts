import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerLoginComponent } from './pages/auth/ver-login/ver-login.component';

const routes: Routes = [
  { path: 'login', component: VerLoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
