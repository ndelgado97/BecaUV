
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../../../../services/login/login.service';

@Component({
  selector: 'app-ver-login',
  templateUrl: './ver-login.component.html',
  styleUrls: ['./ver-login.component.scss']
})
export class VerLoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

  ingresar() {
    if (this.form.valid) {
      const credentials = this.form.value;
      //console.log('Intentando login con:', credentials);
      
      // En ver-login.component.ts - función ingresar

      this.loginService.loginUser(credentials).subscribe({
        next: (response: any) => {
          //console.log('Respuesta del servidor:', response);
          if (response.success) {
            // Guardar el token correctamente
            localStorage.setItem('token_login', response.token);
            localStorage.setItem('role', response.usuario.role);
            this.isLoading();
          } else {
            this.error('Credenciales inválidas');
          }
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.error();
        }
      });
    }
  }

  error(message: string = 'Usuario o contraseña inválida') {
    this._snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  isLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loading = false;
    }, 2000);
  }
}