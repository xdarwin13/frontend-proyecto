import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginEstudianteComponent } from './components/login-estudiante/login-estudiante.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsistenciaEstudianteComponent } from './components/asistencia-estudiante/asistencia-estudiante.component';


import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HeaderComponent } from './components/layout/header/header.component';
import { AsideComponent } from './components/layout/aside/aside.component';
import { ContentComponent } from './components/layout/content/content.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CrearEstudiantesComponent } from './components/estudiantes/crear-estudiantes/crear-estudiantes.component';
import { MostrarEstudiantesComponent } from './components/estudiantes/mostrar-estudiantes/mostrar-estudiantes.component';
import { ActualizarEstudiantesComponent } from './components/estudiantes/actualizar-estudiantes/actualizar-estudiantes.component';
import { MostrarAsistenciasComponent } from './components/asistencias/mostrar-asistencias/mostrar-asistencias.component';
import { ActualizarAsistenciasComponent } from './components/asistencias/actualizar-asistencias/actualizar-asistencias.component';

import { CrearMateriasComponent } from './components/materias/crear-materias/crear-materias.component';
import { MostrarMateriasComponent } from './components/materias/mostrar-materias/mostrar-materias.component';
import { ActualizarMateriasComponent } from './components/materias/actualizar-materias/actualizar-materias.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import {  ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputGroupModule } from 'primeng/inputgroup';
@NgModule({
  declarations: [
    AppComponent,
    LoginEstudianteComponent,
    AsistenciaEstudianteComponent,
    HeaderComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    DashboardComponent,
    CrearEstudiantesComponent,
    MostrarEstudiantesComponent,
    ActualizarEstudiantesComponent,
    MostrarAsistenciasComponent,
    ActualizarAsistenciasComponent,
    CrearMateriasComponent,
    MostrarMateriasComponent,
    ActualizarMateriasComponent,
LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    ,FormsModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    PanelMenuModule,
    CardModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    InputGroupModule
    

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
