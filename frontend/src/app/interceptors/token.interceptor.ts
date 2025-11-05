import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Deja pasar recursos no-API
    if (!req.url.includes('/api/')) return next.handle(req);
    // Deja pasar login sin token
    if (req.url.includes('/api/login')) return next.handle(req);

    const token = localStorage.getItem('token_login');
    return token
      ? next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
      : next.handle(req);
  }
}
