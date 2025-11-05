import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginRoutingModule } from './login-routing.module';

// ajusta las rutas si difieren
import { LoginComponent } from './login.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { VerLoginComponent } from './components/ver-login/ver-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginScreenComponent,
    LoginContainerComponent,
    VerLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material necesarios por tu template
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,

    LoginRoutingModule
  ],
  // exporta si otro módulo usa estos componentes
  exports: [
    LoginComponent,
    LoginScreenComponent,
    LoginContainerComponent,
    VerLoginComponent
  ]
})
export class LoginModule {}
