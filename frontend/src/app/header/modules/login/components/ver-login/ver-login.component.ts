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
  hide = true;

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    console.log('API URL:', (this.loginService as any).apiUrl);
    this.form.statusChanges.subscribe(s => console.log('formStatus:', s, this.form.value));
  }

  ingresar() {
    console.log('submit', this.form.valid, this.form.value);
    if (this.form.invalid) { this.error('Formulario inválido'); return; }

    this.loading = true;
    this.loginService.loginUser(this.form.value as any).subscribe({
      next: (res) => {
        console.log('login response:', res);
        if (res?.success) {
          localStorage.setItem('token_login', res.token);
          localStorage.setItem('role', res.usuario?.role || '');
          this.router.navigate(['/']);
        } else {
          this.error('Credenciales inválidas');
        }
      },
      error: (err) => { console.error('login http error:', err); this.error(); },
      complete: () => this.loading = false
    });
  }

  error(msg: string = 'Usuario o contraseña inválida') {
    this.snack.open(msg, 'Cerrar', { duration: 4000, horizontalPosition: 'center', verticalPosition: 'top' });
  }
}
