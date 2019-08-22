import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { MateriasComponent } from './componentes/materias/materias.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { LoginGuard } from './guards/login.guard';
import { CrearCarreraComponent } from './componentes/carreras/crear-carrera/crear-carrera.component';
import { CrearUsuarioComponent } from './componentes/usuarios/crear-usuario/crear-usuario.component';
import { InscripcionesCarrerasComponent } from './componentes/inscripciones/carreras/inscripciones-carreras/inscripciones-carreras.component';
import { InscripcionesFinalesComponent } from './componentes/inscripciones/finales/inscripciones-finales/inscripciones-finales.component';
import { InscripcionesCursadasComponent } from './componentes/inscripciones/cursadas/inscripciones-cursadas/inscripciones-cursadas.component';
import { AlumnosComponent } from './componentes/alumnos/alumnos.component';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'carreras', component: CarrerasComponent, canActivate: [LoginGuard] },
  { path: 'carreras/crear', component: CrearCarreraComponent, canActivate: [LoginGuard] }, // pasar a modal y eliminar
  { path: 'materias', component: MateriasComponent, canActivate: [LoginGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuard] },
  { path: 'usuarios/crear', component: CrearUsuarioComponent, canActivate: [LoginGuard] }, // pasar a modal y eliminar
  { path: 'alumnos', component: AlumnosComponent, canActivate: [LoginGuard] },

  { path: 'inscripcion/carreras', component: InscripcionesCarrerasComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/cursadas', component: InscripcionesCursadasComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/mesas', component: InscripcionesFinalesComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
