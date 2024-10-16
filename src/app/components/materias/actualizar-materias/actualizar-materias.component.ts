import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../../services/materia/materia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-actualizar-materias',
  templateUrl: './actualizar-materias.component.html',
  styleUrls: ['./actualizar-materias.component.css']
})
export class ActualizarMateriasComponent implements OnInit {
  public form: FormGroup;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private materiaService: MateriaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getMateriaPorId(this.id);
  }

  getMateriaPorId(id: number) {
    this.materiaService.getMateriaPorId(id).subscribe({
      next: (data) => {
        console.log(data);
        this.form.setValue({
          nombre: data.nombre,
          carrera: data.carrera,
        });
      },
      error: (err) => {
        console.error('Error al obtener la materia:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la materia' });
      }
    });
  }

  onSubmit(): void {
    const { nombre, carrera } = this.form.value; // Desestructuración para obtener los valores
    this.materiaService.actualizarMateria(this.id.toString(), nombre, carrera).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Materia actualizada correctamente' });
        this.router.navigate(['/dashboard/materias']); // Redirigir a la lista de materias
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la materia' });
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/materias'); // Redirigir a la lista de materias
  }

  get nombre() { return this.form.get('nombre'); }
  get carrera() { return this.form.get('carrera'); }
}
