import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaEstudianteService } from '../../services/asistencia-estudiante.service';
import { AuthestudiantesService } from '../../services/authestudiantes.service';

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

  constructor(
    private fb: FormBuilder,
    private asistenciaService: AsistenciaEstudianteService, // Inyecta el servicio de asistencia
    private authService: AuthestudiantesService // Servicio de autenticación
  ) {
    this.asistenciaForm = this.fb.group({
      materia: ['', Validators.required],
      hora_salida: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde el servicio de autenticación
    this.id_estudiante = this.authService.getUserId();
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
}
