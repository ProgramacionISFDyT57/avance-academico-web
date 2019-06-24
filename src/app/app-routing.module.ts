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

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'carreras', component: CarrerasComponent, canActivate: [LoginGuard] },
  { path: 'materias', component: MateriasComponent, canActivate: [LoginGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuard] },
  { path: 'carreras/crear', component: CrearCarreraComponent, canActivate: [LoginGuard] },
  { path: 'materias/crear/:id', component: CrearMateriaComponent, canActivate: [LoginGuard] },
  { path: 'usuarios/crear', component: CrearUsuarioComponent, canActivate: [LoginGuard] },
  { path: 'carreras/abrir_inscripcion/:id', component: AbrirInscripcionCarreraComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
