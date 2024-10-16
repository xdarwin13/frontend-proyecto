import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthestudiantesService } from '../estudiante/authestudiantes.service';
import { AuthadminService } from '../admin/authadmin.service';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiUrl = 'https://backend-proyecto-vhbm.onrender.com/materias'; // Cambia esta URL a la de tu backend

  constructor(
    private http: HttpClient,
    private authService: AuthestudiantesService, // Inyecta el AuthestudiantesService para obtener el token
  private authAdminService: AuthadminService // Inyecta el AuthadminService para obtener el token
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtén el token desde AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
    });
  }


  private getHeaders1(): HttpHeaders {
    const token = this.authAdminService.getToken(); // Obtén el token desde AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
    });
  }


  // Obtener materias por carrera con headers
  getMateriasPorCarrera(carrera: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/carreras`, { carrera }, { headers: this.getHeaders() });
  }


// Obtener materia por ID
  getMateriaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders1() });
  }

  // Obtener todas las materias
  getTodasLasMaterias(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders1() });
  }

  // Crear nueva materia
  crearMateria(nombre: string, carrera: string): Observable<any> {
    return this.http.post(this.apiUrl, { nombre, carrera }, { headers: this.getHeaders1() });
  }

  // Actualizar materia
  actualizarMateria(id: string, nombre: string, carrera: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { nombre, carrera }, { headers: this.getHeaders1() });
  }

  // Eliminar materia
  eliminarMateria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders1() });
  }



}
