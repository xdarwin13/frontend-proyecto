import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEstudianteComponent } from './components/login-estudiante/login-estudiante.component';
import { AsistenciaEstudianteComponent } from './components/asistencia-estudiante/asistencia-estudiante.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-students', pathMatch: 'full' },
  {path: 'login-students', component: LoginEstudianteComponent},
  {path: 'asistencia-students', component: AsistenciaEstudianteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
