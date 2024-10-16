import { Component, OnInit} from '@angular/core';
import { MateriaService } from '../../../services/materia/materia.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-materias',
  templateUrl: './crear-materias.component.html',
  styleUrl: './crear-materias.component.css'
})
export class CrearMateriasComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private materiaService: MateriaService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { nombre, carrera } = this.form.value; // Desestructuración para obtener los valores
    this.materiaService.crearMateria(nombre, carrera).subscribe( // Pasa los dos argumentos
      () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Materia creada correctamente' });
        this.router.navigateByUrl('/dashboard/materias');
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la materia' });
        console.error(err);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/materias');
  }

  get nombre() { return this.form.get('nombre'); }
  get carrera() { return this.form.get('carrera'); }
}