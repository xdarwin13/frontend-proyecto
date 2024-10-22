import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../../services/materia/materia.service';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-mostrar-materias',
  templateUrl: './mostrar-materias.component.html',
  styleUrl: './mostrar-materias.component.css'
})
export class MostrarMateriasComponent implements OnInit {
  
  public materias: any[] = []; // Arreglo para almacenar las materias
  public displayedColumns: string[] = ["id", "nombre", "carrera"]; // Ajusta las columnas según tus datos

  constructor(
    private materiaService: MateriaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarMaterias();
  }

  // Método para obtener todas las materias
  mostrarMaterias() {
    this.materiaService.getTodasLasMaterias().subscribe({
      next: (data) => {
        this.materias = data.materias; // Asegúrate de que la estructura de datos sea correcta
  
      },
      error: (err) => {
        console.error('Error al obtener las materias', err);
      }
    });
  }

  eliminarMateria(id: number) {
    this.materiaService.eliminarMateria(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Materia eliminada correctamente' });
       this.mostrarMaterias() // Redirigir a la lista de materias
      },
      error: (err) => {
        console.error('Error al eliminar la materia:', err);
        this.mostrarMaterias()
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la materia' });
      }
    });
  }

}
