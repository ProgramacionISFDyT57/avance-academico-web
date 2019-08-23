import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-abrir-inscripcion-carrera',
  templateUrl: './abrir-inscripcion-carrera.component.html',
  styleUrls: ['./abrir-inscripcion-carrera.component.scss']
})
export class AbrirInscripcionCarreraComponent implements OnInit {

  formulario: FormGroup;
  idCarrera: number;
  carrera: string;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private carreraService: CarrerasService,
    public dialogRef: MatDialogRef<AbrirInscripcionCarreraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  private crearFormulario() {
    const añoActual = new Date().getFullYear();
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario = this.fb.group({
      cohorte: [añoActual, [Validators.required, Validators.min(añoActual)]],
      fecha_inicio: [fechaActual, Validators.required],
      fecha_limite: [fechaLimite, Validators.required]
    });
  }

  enviar() {
    this.showSpinner = true;
    const carrerasAbiertas = {
      cohorte: this.formulario.value.cohorte,
      id_carrera: this.idCarrera,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite
    };

    this.carreraService.abrirInscripcionCarrera(carrerasAbiertas).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.notif.success(resp.mensaje);
        this.dialogRef.close(true);
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

  ngOnInit() {
    this.idCarrera = this.data.idCarrera;
    this.carrera = this.data.carrera;
    this.crearFormulario();
  }

}
