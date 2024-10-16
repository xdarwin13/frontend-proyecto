import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEstudianteComponent } from './components/login-estudiante/login-estudiante.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { AsistenciaEstudianteComponent } from './components/asistencia-estudiante/asistencia-estudiante.component';
import { AuthGuardEstudiantes } from './guards/auth-estudiantes/authestudiantes.guard';
import { AuthGuardAdmin } from './guards/auth-admin/authadmin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Materias
import { CrearMateriasComponent } from './components/materias/crear-materias/crear-materias.component';
import { MostrarMateriasComponent } from './components/materias/mostrar-materias/mostrar-materias.component';
import { EliminarMateriasComponent } from './components/materias/eliminar-materias/eliminar-materias.component';
import { ActualizarMateriasComponent } from './components/materias/actualizar-materias/actualizar-materias.component';

// Asistencias
import { MostrarAsistenciasComponent } from './components/asistencias/mostrar-asistencias/mostrar-asistencias.component';
import { ActualizarAsistenciasComponent } from './components/asistencias/actualizar-asistencias/actualizar-asistencias.component';
import { EliminarAsistenciasComponent } from './components/asistencias/eliminar-asistencias/eliminar-asistencias.component';

// Estudiantes
import { CrearEstudiantesComponent } from './components/estudiantes/crear-estudiantes/crear-estudiantes.component';
import { MostrarEstudiantesComponent } from './components/estudiantes/mostrar-estudiantes/mostrar-estudiantes.component';
import { EliminarEstudiantesComponent } from './components/estudiantes/eliminar-estudiantes/eliminar-estudiantes.component';
import { ActualizarEstudiantesComponent } from './components/estudiantes/actualizar-estudiantes/actualizar-estudiantes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-students', pathMatch: 'full' },
  {path: 'login-students', component: LoginEstudianteComponent,canActivate: [AuthGuardEstudiantes]},
  {path: 'login-admin', component: LoginAdminComponent, canActivate: [AuthGuardAdmin]},
  {path: 'asistencia-students', component: AsistenciaEstudianteComponent,canActivate: [AuthGuardEstudiantes]},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardAdmin],  // Protege el dashboard
    children: [
      // Materias
      { path: 'materias/crear', component: CrearMateriasComponent },
      { path: 'materias', component: MostrarMateriasComponent },
      { path: 'materias/dele/:id', component: EliminarMateriasComponent },
      { path: 'materias/edit/:id', component: ActualizarMateriasComponent },

      // Asistencia
      { path: 'mostrar-asistencias', component: MostrarAsistenciasComponent },
      { path: 'actualizar-asistencias', component: ActualizarAsistenciasComponent },
      { path: 'eliminar-asistencias', component: EliminarAsistenciasComponent },

      // Estudiantes
      { path: 'crear-estudiantes', component: CrearEstudiantesComponent },
      { path: 'mostrar-estudiantes', component: MostrarEstudiantesComponent },
      { path: 'eliminar-estudiantes', component: EliminarEstudiantesComponent },
      { path: 'actualizar-estudiantes', component: ActualizarEstudiantesComponent }
    ]
  },
  { path: '**', redirectTo: '/login-students' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
