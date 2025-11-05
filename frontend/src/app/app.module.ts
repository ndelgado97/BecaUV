// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
// Importa el interceptor
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    // Otros componentes...
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Otros módulos...
  ],
  providers: [
    // Registra el interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // Otros servicios...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }