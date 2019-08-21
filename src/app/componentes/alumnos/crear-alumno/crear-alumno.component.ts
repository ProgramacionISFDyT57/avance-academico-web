import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { NotificationsService } from 'angular2-notifications';
import { Usuario } from 'src/app/modelos/usuario';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { MatDialogRef } from '@angular/material';
import { CarreraAbierta } from 'src/app/modelos/carreraabierta';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.scss']
})
export class CrearAlumnoComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = true;
  carreras: CarreraAbierta[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearAlumnoComponent>,
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: [null],
      id_carrera_abierta: [null, Validators.required]
    });
  }

  private listarCarrerasAbiertas(): Promise<CarreraAbierta[]> {
    return new Promise( (resolve, reject) => {
      this.carrerasService.listarCarrerasAbiertasHoy().subscribe(
        (resp) => {
          console.log(resp);
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  enviar() {
    this.showSpinner = true;
    const usuario: Usuario = {
      apellido: this.formulario.value.apellido,
      email: this.formulario.value.email,
      fecha_nacimiento: this.formulario.value.fecha_nacimiento,
      nombre: this.formulario.value.nombre
    };
    const id_carrera_abierta = this.formulario.value.id_carrera_abierta;
    this.alumnosService.crearAlumno(usuario, id_carrera_abierta).subscribe(
      (resp) => {
        this.crearFormulario();
        this.showSpinner = false;
        this.notif.success(resp.mensaje);
        console.log(resp);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.error(error);
      }
    );
  }

  public cerrar() {
    this.dialogRef.close();
  }

  async ngOnInit() {
    try {
      this.crearFormulario();
      this.carreras = await this.listarCarrerasAbiertas();
      this.showSpinner = false;
    } catch (error) {
      console.error(error);
    }

  }

}
