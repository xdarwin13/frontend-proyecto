import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthestudiantesService } from '../estudiante/authestudiantes.service';
import { AuthadminService } from '../admin/authadmin.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaEstudianteService {
  private apiUrl = 'https://backend-proyecto-vhbm.onrender.com/asistencias'; // Cambia esta URL a la de tu backend

  constructor(
    private http: HttpClient,
    private authService: AuthestudiantesService, // Inyecta el AuthestudiantesService para obtener el token
    private authAdminService: AuthadminService // Inyecta el AuthadminService para obtener el token
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtén el token desde AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en los encabezadoss
    });
  }

  private getHeaders1(): HttpHeaders {
    const token = this.authAdminService.getToken(); // Obtén el token desde AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
    });
  }

  // Método para registrar la asistencia de un estudiante
  registrarAsistencia(asistenciaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/estudiante`, asistenciaData, { headers: this.getHeaders() });
  }

   // Obtener asistencia por ID (solo admin)
   getAsistenciaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders1() });
  }

  // Listar todas las asistencias (solo admin)
  getTodasLasAsistencias(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders1() });
  }

  // Actualizar asistencia (solo admin)
  actualizarAsistencia(id: string, id_estudiante: number, id_materia: number, salon: string, fecha: Date, hora_entrada: Date, hora_salida?: Date): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { id_estudiante, id_materia, salon, fecha, hora_entrada, hora_salida }, { headers: this.getHeaders1() });
  }

  // Eliminar asistencia (solo admin)
  eliminarAsistencia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders1() });
  }
}
