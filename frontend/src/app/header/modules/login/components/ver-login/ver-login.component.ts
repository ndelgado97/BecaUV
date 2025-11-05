import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-ver-login',
  templateUrl: './ver-login.component.html',
  styleUrls: ['./ver-login.component.scss']
})
export class VerLoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  hide = true; // para mostrar/ocultar password

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
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
    console.log('Se presiona ingresar', this.form.value, 'valid?', this.form.valid);
    if (this.form.invalid) {
      this.error('Formulario inválido');
      return;
    }

    this.loading = true;

    this.loginService.loginUser(this.form.value as any).subscribe({
      next: (response: any) => {
        console.log('Respuesta login:', response);
        if (response?.success) {
          localStorage.setItem('token_login', response.token);
          localStorage.setItem('role', response.usuario?.role || '');
          this.router.navigate(['/']); // ajusta destino
        } else {
          this.error('Credenciales inválidas');
        }
      },
      error: (err) => {
        console.error('Error HTTP login:', err);
        const msg = err?.error?.message || 'Usuario o contraseña inválida';
        this.error(msg);
      },
      complete: () => (this.loading = false)
    });
  }

  error(message: string) {
    this.snack.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
