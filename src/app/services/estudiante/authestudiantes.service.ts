import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthadminService } from '../admin/authadmin.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthestudiantesService {

  private apiUrl = 'https://backend-proyecto-vhbm.onrender.com/estudiantes'; // Cambia esta URL a la de tu backend

  constructor(private http: HttpClient, private authAdminService: AuthadminService) { }

  

  private getHeaders1(): HttpHeaders {
    const token = this.authAdminService.getToken(); // Obtén el token desde AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
    });
  }

  register(nombre: string, email: string, password: string, carrera: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nombre, email, password, carrera }, { headers: this.getHeaders1() });
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // Almacena el token y el userId en el localStorage
        localStorage.setItem('authToken1', response.token1); // Almacena el token
        localStorage.setItem('userId1', response.student.id); // Almacena el userId
        localStorage.setItem('carrera1', response.student.carrera); // Almacena la carrera
        localStorage.setItem('nombre1', response.student.nombre); // Almacena el nombre

      })
    );
  }

  // Obtener todos los estudiantes (solo administrador)
  getTodosLosEstudiantes(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders1() });
  }

  // Obtener perfil de un estudiante por ID (solo administrador)
  getEstudiantePorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders1() });
  }

  // Actualizar estudiante por ID (solo administrador)
  actualizarEstudiante(id: string, nombre: string, email: string, carrera: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { nombre, email, carrera, password }, { headers: this.getHeaders1() });
  }

  // Eliminar estudiante por ID (solo administrador)
  eliminarEstudiante(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders1() });
  }

  getUserId(): number | null {
    // Recupera el userId del localStorage
    const userId = localStorage.getItem('userId1');
    return userId ? parseInt(userId, 10) : null;
  }


  getCarrera(): string | null {
    // Recupera la carrera del localStorage
    return localStorage.getItem('carrera1');
  }

  getToken(): string | null {
    // Recupera el token del localStorage
    return localStorage.getItem('authToken1');
  }

  logout(): void {
    // Elimina el token y el userId del localStorage
    localStorage.removeItem('authToken1');
    localStorage.removeItem('userId1');
    localStorage.removeItem('carrera1');
    localStorage.removeItem('nombre1');
  }

}