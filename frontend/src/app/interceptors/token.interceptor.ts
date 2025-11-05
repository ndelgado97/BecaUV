// src/app/interceptors/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptando petición a:', request.url);
    
    // No añadir token para la ruta de login
    if (request.url.includes('/api/login')) {
      return next.handle(request).pipe(
        catchError(this.handleError.bind(this))
      );
    }

    const token = localStorage.getItem('token_login');
    console.log('Token encontrado:', token ? 'Sí' : 'No');
    
    if (token) {
      // Clonar la solicitud y añadir token con prefijo Bearer
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      
      console.log('Enviando solicitud con token:', authReq.url);
      
      // Continuar con la solicitud modificada
      return next.handle(authReq).pipe(
        catchError(this.handleError.bind(this))
      );
    }
    
    return next.handle(request).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición HTTP:', error);
    
    if (error.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('token_login');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    }
    return throwError(() => error);
  }
}