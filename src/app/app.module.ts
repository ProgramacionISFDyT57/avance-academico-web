import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modulos/material.module';

// Notifications
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { MateriasComponent } from './componentes/materias/materias.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { CrearCarreraComponent } from './componentes/carreras/crear-carrera/crear-carrera.component';
import { CrearMateriaComponent } from './componentes/materias/crear-materia/crear-materia.component';
import { CrearUsuarioComponent } from './componentes/usuarios/crear-usuario/crear-usuario.component';
import { AbrirInscripcionCarreraComponent } from './componentes/carreras/abrir-inscripcion-carrera/abrir-inscripcion-carrera.component';
import { AbrirInscripcionCursadaComponent } from './componentes/materias/abrir-inscripcion-cursada/abrir-inscripcion-cursada.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CarrerasComponent,
    MateriasComponent,
    UsuariosComponent,
    CrearCarreraComponent,
    CrearMateriaComponent,
    CrearUsuarioComponent,
    AbrirInscripcionCarreraComponent,
    AbrirInscripcionCursadaComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
