import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthadminService } from '../../services/admin/authadmin.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private authAdminService: AuthadminService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authAdminService.getToken();
    const isAuthenticated = this.authAdminService.getUserId() !== null && token && !this.isTokenExpired(token); // Verifica si el usuario está autenticado y el token es válido

    // Si está autenticado y quiere acceder al login, lo redirigimos a send-location
    if (route.routeConfig?.path === 'login-admin' && isAuthenticated) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Si no está autenticado o el token es inválido/expirado y no está en la ruta de login, lo redirigimos al login
    if (!isAuthenticated && route.routeConfig?.path !== 'login-admin') {
      this.router.navigate(['/login-admin']);
      return false;
    }

    return true; // Permite el acceso a la ruta
  }

  // Verifica si el token ha expirado
  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token); // Decodifica el token
      const currentTime = Math.floor(new Date().getTime() / 1000); // Tiempo actual en segundos
      return decoded.exp < currentTime; // Verifica si el token ha expirado
    } catch (error) {
      return true; // Si ocurre un error al decodificar, trata el token como expirado/inválido
    }
  }
}
