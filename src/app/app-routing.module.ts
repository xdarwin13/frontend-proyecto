import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEstudianteComponent } from './components/login-estudiante/login-estudiante.component';
import { AsistenciaEstudianteComponent } from './components/asistencia-estudiante/asistencia-estudiante.component';
import { AuthGuardEstudiantes } from './guards/auth-estudiantes/authestudiantes.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login-students', pathMatch: 'full' },
  {path: 'login-students', component: LoginEstudianteComponent,canActivate: [AuthGuardEstudiantes]},
  {path: 'asistencia-students', component: AsistenciaEstudianteComponent,canActivate: [AuthGuardEstudiantes]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
