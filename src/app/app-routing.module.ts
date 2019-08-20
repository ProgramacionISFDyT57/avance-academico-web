import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { MateriasComponent } from './componentes/materias/materias.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { LoginGuard } from './guards/login.guard';
import { CrearCarreraComponent } from './componentes/carreras/crear-carrera/crear-carrera.component';
import { CrearMateriaComponent } from './componentes/materias/crear-materia/crear-materia.component';
import { CrearUsuarioComponent } from './componentes/usuarios/crear-usuario/crear-usuario.component';
import { AbrirInscripcionCarreraComponent } from './componentes/carreras/abrir-inscripcion-carrera/abrir-inscripcion-carrera.component';
import { InscripcionesCarrerasComponent } from './componentes/inscripciones/carreras/inscripciones-carreras/inscripciones-carreras.component';
import { InscripcionesFinalesComponent } from './componentes/inscripciones/finales/inscripciones-finales/inscripciones-finales.component';
import { InscripcionesCursadasComponent } from './componentes/inscripciones/cursadas/inscripciones-cursadas/inscripciones-cursadas.component';
import { DetallesCursadaComponent } from './componentes/inscripciones/cursadas/detalles-cursada/detalles-cursada.component';
import { DetallesFinalComponent } from './componentes/inscripciones/finales/detalles-final/detalles-final.component';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'carreras', component: CarrerasComponent, canActivate: [LoginGuard] },
  { path: 'carreras/crear', component: CrearCarreraComponent, canActivate: [LoginGuard] },
  { path: 'carreras/abrir_inscripcion/:id', component: AbrirInscripcionCarreraComponent, canActivate: [LoginGuard] },
  { path: 'materias', component: MateriasComponent, canActivate: [LoginGuard] },
  { path: 'materias/crear/:id', component: CrearMateriaComponent, canActivate: [LoginGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuard] },
  { path: 'usuarios/crear', component: CrearUsuarioComponent, canActivate: [LoginGuard] },

  { path: 'inscripcion/carreras', component: InscripcionesCarrerasComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/cursadas', component: InscripcionesCursadasComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/cursadas/:id', component: DetallesCursadaComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/mesas', component: InscripcionesFinalesComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/mesas/:id', component: DetallesFinalComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
