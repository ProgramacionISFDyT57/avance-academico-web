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
import { DetallesCarreraComponent } from './componentes/inscripciones/carreras/detalles-carrera/detalles-carrera.component';
import { DetallesCursadaComponent } from './componentes/inscripciones/cursadas/detalles-cursada/detalles-cursada.component';
import { DetallesFinalComponent } from './componentes/inscripciones/finales/detalles-final/detalles-final.component';
import { AvanceAcademicoComponent } from './componentes/avance-academico/avance-academico.component';
import { PlanillaActaVolanteComponent } from './componentes/inscripciones/finales/planilla-acta-volante/planilla-acta-volante.component';
import { PlanillaInscriptosCursadaComponent } from './componentes/inscripciones/cursadas/planilla-inscriptos-cursada/planilla-inscriptos-cursada.component';
import { PlanillaAsistenciaComponent } from './componentes/inscripciones/cursadas/planilla-asistencia/planilla-asistencia.component';
import { HorariosComponent } from './componentes/planillas/horarios/horarios.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: InicioComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'carreras', component: CarrerasComponent, canActivate: [LoginGuard] },
  { path: 'carreras/crear', component: CrearCarreraComponent, canActivate: [LoginGuard] }, // pasar a modal y eliminar
  { path: 'materias', component: MateriasComponent, canActivate: [LoginGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuard] },
  { path: 'usuarios/crear', component: CrearUsuarioComponent, canActivate: [LoginGuard] }, // pasar a modal y eliminar
  { path: 'alumnos', component: AlumnosComponent, canActivate: [LoginGuard] },
  { path: 'avance_academico', component: AvanceAcademicoComponent, canActivate: [LoginGuard] },
  { path: 'avance_academico/:id', component: AvanceAcademicoComponent, canActivate: [LoginGuard] },

  { path: 'inscripcion/carreras', component: InscripcionesCarrerasComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/carreras/:id', component: DetallesCarreraComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/cursadas', component: InscripcionesCursadasComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/cursadas/:id', component: DetallesCursadaComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/mesas', component: InscripcionesFinalesComponent, canActivate: [LoginGuard] },
  { path: 'inscripcion/mesas/:id', component: DetallesFinalComponent, canActivate: [LoginGuard] },

  { path: 'acta_volante/:idMesa', component: PlanillaActaVolanteComponent, canActivate: [LoginGuard] },
  { path: 'acta_volante/:idMesa/:libres', component: PlanillaActaVolanteComponent, canActivate: [LoginGuard] },
  { path: 'planilla_inscriptos_cursada/:idCursada', component: PlanillaInscriptosCursadaComponent, canActivate: [LoginGuard] },
  { path: 'planilla_asistencia/:idCursada', component: PlanillaAsistenciaComponent, canActivate: [LoginGuard] },
  { path: 'horarios', component: HorariosComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
