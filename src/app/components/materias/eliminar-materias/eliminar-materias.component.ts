import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../../services/materia/materia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-eliminar-materias',
  templateUrl: './eliminar-materias.component.html',
  styleUrls: ['./eliminar-materias.component.css']
})
export class EliminarMateriasComponent implements OnInit {
  id: number = 0;

  constructor(
    private materiaService: MateriaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID de la materia desde la URL
    this.eliminarMateria(this.id);
  }

  eliminarMateria(id: number) {
    this.materiaService.eliminarMateria(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Materia eliminada correctamente' });
        this.router.navigate(['/dashboard/materias']); // Redirigir a la lista de materias
      },
      error: (err) => {
        console.error('Error al eliminar la materia:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la materia' });
      }
    });
  }
}
