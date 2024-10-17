import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthestudiantesService } from '../../../services/estudiante/authestudiantes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-estudiantes',
  templateUrl: './crear-estudiantes.component.html',
  styleUrls: ['./crear-estudiantes.component.css']
})
export class CrearEstudiantesComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authEstudiantesService: AuthestudiantesService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { nombre, email, password, carrera } = this.form.value; // Desestructuración
    this.authEstudiantesService.register(nombre, email, password, carrera).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Estudiante creado correctamente' });
        this.router.navigateByUrl('/dashboard/estudiantes');
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el estudiante' });
        console.error(err);
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/dashboard/estudiantes');
  }

  get nombre() { return this.form.get('nombre'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get carrera() { return this.form.get('carrera'); }
}
