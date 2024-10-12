import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaEstudianteService } from '../../services/asistencia-estudiante.service';
import { AuthestudiantesService } from '../../services/authestudiantes.service';
import { MateriaService } from '../../services/materia.service'; // Importar el servicio de materia

@Component({
  selector: 'app-asistencia-estudiante',
  templateUrl: './asistencia-estudiante.component.html',
  styleUrls: ['./asistencia-estudiante.component.css']
})
export class AsistenciaEstudianteComponent implements OnInit {
  asistenciaForm: FormGroup;
  scannerEnabled: boolean = true;
  scannedSalon: string | null = null;
  id_estudiante: number | null = null;
  materias: any[] = []; // Arreglo para almacenar las materias
  scannerHeight: string = '300px'; // Altura predeterminada

  constructor(
    private fb: FormBuilder,
    private asistenciaService: AsistenciaEstudianteService, // Inyecta el servicio de asistencia
    private authService: AuthestudiantesService, // Servicio de autenticación
    private materiaService: MateriaService // Servicio de materias
  ) {
    this.asistenciaForm = this.fb.group({
      id_materia: ['', Validators.required],
      hora_salida: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID del estudiante y la carrera desde el servicio de autenticación
    this.id_estudiante = this.authService.getUserId();
    const carrera = this.authService.getCarrera(); // Obtener la carrera

    if (carrera) {
      // Llamar al servicio de materias para obtener las materias según la carrera
      this.materiaService.getMateriasPorCarrera(carrera).subscribe(
        (response) => {
          this.materias = response.materias; // Asignar las materias obtenidas
        },
        (error) => {
          console.error('Error al obtener las materias:', error);
        }
      );
    }
  }

  // Método para manejar el resultado del escaneo de QR
  onCodeResult(resultString: string) {
    this.scannedSalon = resultString;  // Se asume que el QR contiene solo el número del salón
    this.scannerEnabled = false;       // Deshabilitar el escáner una vez obtenido el QR
  }

  // Método para registrar la asistencia del estudiante
  registrarAsistencia() {
    if (this.asistenciaForm.valid && this.scannedSalon && this.id_estudiante) {
      const asistenciaData = {
        id_estudiante: this.id_estudiante,
        ...this.asistenciaForm.value,
        salon: this.scannedSalon
      };

      // Llamar al servicio de asistencia para registrar la asistencia
      this.asistenciaService.registrarAsistencia(asistenciaData).subscribe(
        (response) => {
          console.log('Asistencia registrada:', response);
          
          // Restablecer el formulario y los datos del escáner
          this.asistenciaForm.reset();
          this.scannedSalon = null;
          this.reiniciarEscaner();
        },
        (error) => {
          console.error('Error al registrar la asistencia:', error);
        }
      );
    }
  }

  // Método para reiniciar el escáner si es necesario
  reiniciarEscaner() {
    this.scannedSalon = null;
    this.scannerEnabled = true;
  }

  // Ajuste de tamaño del escáner
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;

    if (width < 768) { // Pantallas pequeñas
      this.scannerHeight = '400px'; // Altura más pequeña
    } else {
      this.scannerHeight = '400px'; // Altura predeterminada
    }
  }
}
