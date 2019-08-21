import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modulos/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { InscripcionesCarrerasComponent } from './componentes/inscripciones/carreras/inscripciones-carreras/inscripciones-carreras.component';
import { InscripcionesFinalesComponent } from './componentes/inscripciones/finales/inscripciones-finales/inscripciones-finales.component';
import { InscripcionesCursadasComponent } from './componentes/inscripciones/cursadas/inscripciones-cursadas/inscripciones-cursadas.component';
import { AbrirInscripcionFinalComponent } from './componentes/materias/abrir-inscripcion-final/abrir-inscripcion-final.component';
import { ConfirmationDialogComponent } from './servicios/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './servicios/confirmation-dialog/confirmation-dialog.service';
import { AlumnosComponent } from './componentes/alumnos/alumnos.component';
import { DetallesCursadaComponent } from './componentes/inscripciones/cursadas/detalles-cursada/detalles-cursada.component';
import { DetallesFinalComponent } from './componentes/inscripciones/finales/detalles-final/detalles-final.component';
import { DetallesCarreraComponent } from './componentes/inscripciones/carreras/detalles-carrera/detalles-carrera.component';
import { CargarNotasCursadaComponent } from './componentes/inscripciones/cursadas/cargar-notas-cursada/cargar-notas-cursada.component';
import { CrearAlumnoComponent } from './componentes/alumnos/crear-alumno/crear-alumno.component';

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
    InscripcionesCarrerasComponent,
    InscripcionesFinalesComponent,
    InscripcionesCursadasComponent,
    AbrirInscripcionFinalComponent,
    ConfirmationDialogComponent,
    AlumnosComponent,
    DetallesCursadaComponent,
    DetallesFinalComponent,
    DetallesCarreraComponent,
    CargarNotasCursadaComponent,
    CrearAlumnoComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    AbrirInscripcionCursadaComponent,
    AbrirInscripcionFinalComponent,
    CargarNotasCursadaComponent,
    CrearAlumnoComponent
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
    FlexLayoutModule
  ],
  providers: [
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
