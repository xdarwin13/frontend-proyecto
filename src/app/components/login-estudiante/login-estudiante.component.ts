import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthestudiantesService } from '../../services/estudiante/authestudiantes.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.component.html',
  styleUrls: ['./login-estudiante.component.css'],
})
export class LoginEstudianteComponent implements OnInit {
  loginForm: FormGroup;
  captchaQuestion: string = '';
  captchaCorrectAnswer: number = 0;
  captchaError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authEstudiantesService: AuthestudiantesService,
    private router: Router,
    private messageService: MessageService
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
      this.captchaError = true;
      this.messageService.add({ severity: 'error', summary: 'Captcha Incorrecto', detail: 'El resultado del Captcha es incorrecto.' });
      this.generateCaptcha();
      return;
    }

    this.captchaError = false;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authEstudiantesService.login(email, password).subscribe(
        (response) => {
          if (response.token1) {
            this.messageService.add({ severity: 'success', summary: 'Login Exitoso', detail: 'Has iniciado sesión correctamente.' });
            this.router.navigate(['/asistencia-students']);
          }
        },
        (error) => {
          let errorMsg = 'Error del servidor. Inténtalo más tarde.';
          if (error.status === 404) {
            errorMsg = 'Estudiante no encontrado. Verifica el correo.';
          } else if (error.status === 400) {
            errorMsg = 'Credenciales incorrectas. Verifica tu contraseña.';
          }
          this.messageService.add({ severity: 'error', summary: 'Error de Login', detail: errorMsg });
          this.clearForm();
          this.generateCaptcha();
        }
      );
    }
  }

  clearForm() {
    this.loginForm.reset();
  }
}
