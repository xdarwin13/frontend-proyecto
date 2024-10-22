import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AsistenciaEstudianteService } from '../../../services/asistencia/asistencia-estudiante.service';
import { MessageService } from 'primeng/api';
import { AuthestudiantesService } from '../../../services/estudiante/authestudiantes.service';
import { MateriaService } from '../../../services/materia/materia.service';

@Component({
  selector: 'app-actualizar-asistencias',
  templateUrl: './actualizar-asistencias.component.html',
  styleUrls: ['./actualizar-asistencias.component.css']
})
export class ActualizarAsistenciasComponent implements OnInit {
  public form: FormGroup;
  id: number = 0;
  estudiantes: any[] = []; // Lista de estudiantes
  materias: any[] = []; // Lista de materias

  constructor(
    private formBuilder: FormBuilder,
    private asistenciaService: AsistenciaEstudianteService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private authEstudiantesService: AuthestudiantesService,
    private materiaService: MateriaService // Inyecta el servicio de materias
  ) {
    this.form = this.formBuilder.group({
      id_estudiante: [null, [Validators.required]],
      id_materia: [null, [Validators.required]],
      salon: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora_entrada: ['', [Validators.required]],
      hora_salida: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAsistenciaPorId(this.id);
    this.getEstudiantes(); // Obtener estudiantes
    this.getMaterias(); // Obtener materias
  }

  getAsistenciaPorId(id: number): void {
    this.asistenciaService.getAsistenciaPorId(id).subscribe({
      next: (data) => {
        this.form.setValue({
          id_estudiante: data.id_estudiante,
          id_materia: data.id_materia,
          salon: data.salon,
          fecha: data.fecha,
          hora_entrada: data.hora_entrada,
          hora_salida: data.hora_salida || ''
        });
      },
      error: (err) => {
        console.error('Error al obtener la asistencia:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la asistencia' });
      }
    });
  }

  getEstudiantes(): void {
    this.authEstudiantesService.getTodosLosEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data.estudiantes; // Guarda la lista de estudiantes
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los estudiantes' });
      }
    });
  }

  getMaterias(): void {
    this.materiaService.getTodasLasMaterias().subscribe({
      next: (data) => {
        this.materias = data.materias; // Guarda la lista de materias
      },
      error: (err) => {
        console.error('Error al obtener materias:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron obtener las materias' });
      }
    });
  }

  onSubmit(): void {
    const { id_estudiante, id_materia, salon, fecha, hora_entrada, hora_salida } = this.form.value;
    this.asistenciaService.actualizarAsistencia(this.id.toString(), id_estudiante, id_materia, salon, fecha, hora_entrada, hora_salida).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Asistencia actualizada correctamente' });
        this.router.navigate(['/dashboard/asistencias']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la asistencia' });
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/dashboard/asistencias');
  }

  get idEstudiante() { return this.form.get('id_estudiante'); }
  get idMateria() { return this.form.get('id_materia'); }
  get salon() { return this.form.get('salon'); }
  get fecha() { return this.form.get('fecha'); }
  get horaEntrada() { return this.form.get('hora_entrada'); }
  get horaSalida() { return this.form.get('hora_salida'); }
}
