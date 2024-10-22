import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaEstudianteService } from '../../services/asistencia/asistencia-estudiante.service';
import { AuthestudiantesService } from '../../services/estudiante/authestudiantes.service';
import { MateriaService } from '../../services/materia/materia.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

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
  materiaSubscription: Subscription | null = null;
  menuVisible: boolean = false;  // Variable para manejar la visibilidad del menú
  nombreEstudiante: string | null = null; // Agregar esta línea


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private asistenciaService: AsistenciaEstudianteService,
    private authService: AuthestudiantesService,
    private materiaService: MateriaService,
    private messageService: MessageService
  ) {
    this.asistenciaForm = this.fb.group({
      id_materia: ['', Validators.required],
      hora_salida: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id_estudiante = this.authService.getUserId();
    const carrera = this.authService.getCarrera();
    const nombreRaw = localStorage.getItem('nombre1');
    this.nombreEstudiante = nombreRaw ? this.capitalizarNombre(nombreRaw) : null;
    if (carrera) {
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
      return;
    }
    this.scannedSalon = resultString;
    this.scannerEnabled = false;
  }

  // Método para registrar la asistencia del estudiante
  registrarAsistencia() {
    if (this.asistenciaForm.valid && this.scannedSalon && this.id_estudiante) {
      const asistenciaData = {
        id_estudiante: this.id_estudiante,
        ...this.asistenciaForm.value,
        salon: this.scannedSalon
      };

      this.asistenciaService.registrarAsistencia(asistenciaData).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Asistencia registrada correctamente'
          });
          this.asistenciaForm.reset();
          this.scannedSalon = null;
          this.reiniciarEscaner();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo registrar la asistencia'
          });
        }
      );
    }
  }

  reiniciarEscaner() {
    this.scannedSalon = null;
    this.scannerEnabled = true;
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login-students']);
    this.ngOnDestroy();
  }

  // Método para mostrar/ocultar el menú del usuario
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Método para ver perfil (solo la opción por ahora)
  verPerfil() {
    // Implementación futura
  }


  // Método para capitalizar el nombre del estudiante
  capitalizarNombre(nombre: string): string {
    return nombre
      .toLowerCase()
      .replace(/\b\w/g, letra => letra.toUpperCase()); // Capitaliza la primera letra de cada palabra
  }
  
  ngOnDestroy(): void {
    if (this.materiaSubscription) {
      this.materiaSubscription.unsubscribe();
    }
  }
}
