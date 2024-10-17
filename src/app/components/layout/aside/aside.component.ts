import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthadminService } from '../../../services/admin/authadmin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  items: MenuItem[]=[];
  constructor(
    private authadminService: AuthadminService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Asistencia',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/dashboard/asistencias'
      },
      {
        label: 'Estudiantes',
        icon: 'pi pi-fw pi-user',
        routerLink: '/dashboard/estudiantes'
      },
      {
        label: 'Profesores',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Materias',
        icon: 'pi pi-fw pi-book',
        routerLink: '/dashboard/materias'
      }

    ];
  }

  logout(): void {
    this.authadminService.logout(); // Llamamos al servicio de autenticación para cerrar sesión
    this.router.navigate(['/login-admin']); // Redirigir al login
  }
}
