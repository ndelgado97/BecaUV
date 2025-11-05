import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login lazy
  {
    path: 'login',
    loadChildren: () =>
      import('./header/modules/login/login.module').then(m => m.LoginModule)
  },

  // Ejemplos de otros módulos lazy (ajusta si existen)
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./header/modules/alumnos/alumnos.module').then(m => m.AlumnosModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./header/modules/admin/admin.module').then(m => m.AdminModule)
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
