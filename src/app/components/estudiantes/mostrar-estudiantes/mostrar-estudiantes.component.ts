import { Component, OnInit } from '@angular/core';
import { AuthestudiantesService } from '../../../services/estudiante/authestudiantes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mostrar-estudiantes',
  templateUrl: './mostrar-estudiantes.component.html',
  styleUrls: ['./mostrar-estudiantes.component.css']
})
export class MostrarEstudiantesComponent implements OnInit {

  public estudiantes: any[] = []; // Arreglo para almacenar los estudiantes
  public displayedColumns: string[] = ["id", "nombre", "carrera"]; // Ajusta las columnas según tus datos

  constructor(
    private estudianteService: AuthestudiantesService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarEstudiantes();
  }

  // Método para obtener todos los estudiantes
  mostrarEstudiantes() {
    this.estudianteService.getTodosLosEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data.estudiantes; // Asegúrate de que la estructura de datos sea correcta
      },
      error: (err) => {
        console.error('Error al obtener los estudiantes', err);
      }
    });
  }

  eliminarEstudiante(id: number) {
    this.estudianteService.eliminarEstudiante(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Estudiante eliminado correctamente' });
        this.mostrarEstudiantes(); // Recargar la lista de estudiantes
      },
      error: (err) => {
        console.error('Error al eliminar el estudiante:', err);
        this.mostrarEstudiantes();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el estudiante' });
      }
    });
  }

}
