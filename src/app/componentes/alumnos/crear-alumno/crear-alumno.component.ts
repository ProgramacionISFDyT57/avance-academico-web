import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
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
  actualizar = false;
  @ViewChild('myNgForm') myNgForm: NgForm;

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
      id_carrera_abierta: [null, Validators.required],
      domicilio: ['']
    });
  }

  private async listarCarrerasAbiertas() {
    try {
      const res = await this.carrerasService.listarCarrerasAbiertasHoy();
      this.carreras = res;
      this.showSpinner = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.notif.error(error.error.mensaje);
      this.showSpinner = false;
    }
  }

  enviar() {
    this.showSpinner = true;
    const usuario: Usuario = {
      dni: this.formulario.value.dni,
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      telefono: this.formulario.value.telefono,
      email: this.formulario.value.email,
      fecha_nacimiento: this.formulario.value.fecha_nacimiento,
      domicilio: this.formulario.value.domicilio
    };
    const id_carrera_abierta = this.formulario.value.id_carrera_abierta;
    this.alumnosService.crearAlumno(usuario, id_carrera_abierta).subscribe(
      (resp) => {
        console.log(resp);
        this.notif.success(resp.mensaje);
        this.myNgForm.resetForm();
        this.showSpinner = false;
        this.actualizar = true;
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.error(error);
      }
    );
  }

  public cerrar() {
    this.dialogRef.close(this.actualizar);
  }

  ngOnInit() {
    this.crearFormulario();
    this.listarCarrerasAbiertas();
  }

}
