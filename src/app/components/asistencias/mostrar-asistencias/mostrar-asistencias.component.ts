import { Component, OnInit } from '@angular/core';
import { AsistenciaEstudianteService } from '../../../services/asistencia/asistencia-estudiante.service'; // Ajusta la ruta según tu estructura de carpetas
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mostrar-asistencias',
  templateUrl: './mostrar-asistencias.component.html',
  styleUrls: ['./mostrar-asistencias.component.css']
})
export class MostrarAsistenciasComponent implements OnInit {

  public asistencias: any[] = []; // Arreglo para almacenar las asistencias
  public displayedColumns: string[] = ["nombre_estudiante", "nombre_materia", "salon", "fecha", "hora_entrada", "hora_salida"]; // Ajusta las columnas según tus datos

  constructor(
    private asistenciaService: AsistenciaEstudianteService, // Asegúrate de que el servicio esté implementado
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarAsistencias();
  }

  // Método para obtener todas las asistencias
  mostrarAsistencias() {
    this.asistenciaService.getTodasLasAsistencias().subscribe({
      next: (data) => {
        this.asistencias = data.asistencias; // Asegúrate de que la estructura de datos sea correcta
      },
      error: (err) => {
        console.error('Error al obtener las asistencias', err);
      }
    });
  }

  eliminarAsistencia(id: number) {
    this.asistenciaService.eliminarAsistencia(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Asistencia eliminada correctamente' });
        this.mostrarAsistencias(); // Recargar la lista de asistencias
      },
      error: (err) => {
        console.error('Error al eliminar la asistencia:', err);
        this.mostrarAsistencias();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la asistencia' });
      }
    });
  }
}
