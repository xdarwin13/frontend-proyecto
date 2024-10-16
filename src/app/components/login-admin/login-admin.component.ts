import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthadminService } from '../../services/admin/authadmin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit {
  loginForm: FormGroup;
  captchaQuestion: string = '';
  captchaCorrectAnswer: number = 0;
  captchaError: boolean = false;
  loginError: string = ''; // Para manejar errores de login

  constructor(
    private fb: FormBuilder,
    private authadminService: AuthadminService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      captchaAnswer: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.generateCaptcha();
  }

  

  generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    this.captchaCorrectAnswer = num1 + num2;
    this.captchaQuestion = `${num1} + ${num2} = ?`;
  }

  login() {
    const captchaAnswer = Number(this.loginForm.value.captchaAnswer);
  
    // Verificación del Captcha
    if (captchaAnswer !== this.captchaCorrectAnswer) {
      this.captchaError = true; // Mostrar error si el Captcha es incorrecto
      const captchaControl = this.loginForm.get('captchaAnswer');
      if (captchaControl) {
        captchaControl.setValue(''); // Vaciar el campo de Captcha
      }
      this.generateCaptcha(); // Generar un nuevo Captcha
      return;
    }
  
    this.captchaError = false;
  
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      // Llamada al servicio de autenticación
      this.authadminService.login(email, password).subscribe(
        (response) => {
          if (response.token2) {
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          if (error.status === 404) {
            // Estudiante no encontrado
            this.loginError = 'Administrador no encontrado. Verifica el correo.';
          } else if (error.status === 400) {
            // Credenciales inválidas
            this.loginError = 'Credenciales incorrectas. Verifica tu contraseña.';
          } else {
            // Otro error
            this.loginError = 'Error del servidor. Inténtalo más tarde.';
          }
          this.generateCaptcha();
       const captchaControl = this.loginForm.get('captchaAnswer');
        if (captchaControl) {
          captchaControl.setValue(''); // Vaciar el campo de Captcha
        }
        }
      );
    }
  } 
}