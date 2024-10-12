import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginEstudianteComponent } from './components/login-estudiante/login-estudiante.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsistenciaEstudianteComponent } from './components/asistencia-estudiante/asistencia-estudiante.component';


import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [
    AppComponent,
    LoginEstudianteComponent,
    AsistenciaEstudianteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    ,FormsModule,
    ReactiveFormsModule,
    ZXingScannerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
