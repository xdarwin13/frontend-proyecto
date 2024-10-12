import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthestudiantesService } from './authestudiantes.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiUrl = 'https://backend-proyecto-vhbm.onrender.com/materias'; // Cambia esta URL a la de tu backend

  constructor(
    private http: HttpClient,
    private authService: AuthestudiantesService // Inyecta el AuthestudiantesService para obtener el token
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtén el token desde AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
    });
  }

  // Obtener materias por carrera con headers
  getMateriasPorCarrera(carrera: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/carreras`, { carrera }, { headers: this.getHeaders() });
  }
}
