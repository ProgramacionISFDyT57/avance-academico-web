import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modulos/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { MateriasComponent } from './componentes/materias/materias.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CarrerasComponent,
    MateriasComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
