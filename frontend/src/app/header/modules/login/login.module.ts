import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { VerLoginComponent } from './components/ver-login/ver-login.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';

@NgModule({
  declarations: [LoginComponent, VerLoginComponent, LoginContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,      // <- imprescindible aquí
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LoginRoutingModule
  ]
})
export class LoginModule {}
