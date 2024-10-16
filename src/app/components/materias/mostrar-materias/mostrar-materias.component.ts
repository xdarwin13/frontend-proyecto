import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../../services/materia/materia.service';
import { Router } from '@angular/router';

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

}
