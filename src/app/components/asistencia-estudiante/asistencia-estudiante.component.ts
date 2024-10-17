import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaEstudianteService } from '../../services/asistencia/asistencia-estudiante.service';
import { AuthestudiantesService } from '../../services/estudiante/authestudiantes.service';
import { MateriaService } from '../../services/materia/materia.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asistencia-estudiante',
  templateUrl: './asistencia-estudiante.component.html',
  styleUrls: ['./asistencia-estudiante.component.css']
})
export class AsistenciaEstudianteComponent implements OnInit, OnDestroy {
  asistenciaForm: FormGroup;
  scannerEnabled: boolean = true;
  scannedSalon: string | null = null;
  id_estudiante: number | null = null;
  materias: any[] = [];
  scannerHeight: string = '300px';
  materiaSubscription: Subscription | null = null;  // Variable para manejar la suscripción

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private asistenciaService: AsistenciaEstudianteService,
    private authService: AuthestudiantesService,
    private materiaService: MateriaService
  ) {
    this.asistenciaForm = this.fb.group({
      id_materia: ['', Validators.required],
      hora_salida: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID del estudiante y la carrera desde el servicio de autenticación
    this.id_estudiante = this.authService.getUserId();
    const carrera = this.authService.getCarrera();

    if (carrera) {
      // Suscribirse a las materias según la carrera
      this.materiaSubscription = this.materiaService.getMateriasPorCarrera(carrera).subscribe(
        (response) => {
          this.materias = response.materias;
        },
        (error) => {
          console.error('Error al obtener las materias:', error);
        }
      );
    }
  }

  // Método para manejar el resultado del escaneo de QR
  onCodeResult(resultString: string) {
    if (!this.scannerEnabled) {
      return;  // Evitar procesamiento repetido si el escáner ya está deshabilitado
    }

    this.scannedSalon = resultString;  // Obtener el resultado del QR
    this.scannerEnabled = false;  // Deshabilitar el escáner inmediatamente después del escaneo
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

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login-students']);
    this.ngOnDestroy();  // Llamar manualmente al destroy para limpiar
  }

  // Método para destruir recursos o desuscribirse de observables
  ngOnDestroy(): void {
    if (this.materiaSubscription) {
      this.materiaSubscription.unsubscribe();  // Limpiar la suscripción
    }
  }

  // Ajuste de tamaño del escáner
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;

    if (width < 768) { // Pantallas pequeñas
      this.scannerHeight = '400px';
    } else {
      this.scannerHeight = '400px';
    }
  }
}
