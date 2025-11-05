import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  apiUrl = environment.backend + 'api/login';

  constructor(private http: HttpClient) {
    console.log('API URL:', this.apiUrl);
  }

  loginUser(credentials: { usuario: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token_login');
  }

  rolesAccess(): boolean {
    const role = localStorage.getItem('role')?.trim();
    return role === 'Administrador';
  }
}
