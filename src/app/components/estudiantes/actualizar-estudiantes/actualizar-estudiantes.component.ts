import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthestudiantesService } from '../../../services/estudiante/authestudiantes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-actualizar-estudiantes',
  templateUrl: './actualizar-estudiantes.component.html',
  styleUrls: ['./actualizar-estudiantes.component.css']
})
export class ActualizarEstudiantesComponent implements OnInit {
  public form: FormGroup;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private estudianteService: AuthestudiantesService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      carrera: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getEstudiantePorId(this.id);
  }

  getEstudiantePorId(id: number): void {
    this.estudianteService.getEstudiantePorId(id).subscribe({
      next: (data) => {
        this.form.setValue({
          nombre: data.nombre,
          email: data.email,
          carrera: data.carrera,
          password: ''
        });
      },
      error: (err) => {
        console.error('Error al obtener el estudiante:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el estudiante' });
      }
    });
  }

  onSubmit(): void {
    const { nombre, email, carrera, password } = this.form.value;
    this.estudianteService.actualizarEstudiante(this.id.toString(), nombre, email, carrera, password).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Estudiante actualizado correctamente' });
        this.router.navigate(['/dashboard/estudiantes']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el estudiante' });
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/dashboard/estudiantes');
  }

  get nombre() { return this.form.get('nombre'); }
  get email() { return this.form.get('email'); }
  get carrera() { return this.form.get('carrera'); }
  get password() { return this.form.get('password'); }
}
