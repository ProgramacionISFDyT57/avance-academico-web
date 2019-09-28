import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  añoActual = new Date().getFullYear();
  minDateInicio = new Date(this.añoActual - 100, 0, 1);
  minDateFin = new Date();

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private carreraService: CarrerasService,
    public dialogRef: MatDialogRef<AbrirInscripcionCarreraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  public cambioFechaInicio() {
    this.formulario.get('fecha_limite').enable();
    this.formulario.get('fecha_inicio').enable();
    this.minDateFin = new Date(this.formulario.value.fecha_inicio);
    const fechaLimite = new Date(this.formulario.value.fecha_inicio);
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario.patchValue({fecha_limite: fechaLimite});
    this.formulario.get('fecha_limite').disable();
    this.formulario.get('fecha_inicio').disable();
  }

  private crearFormulario() {
    const añoActual = new Date().getFullYear();
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario = this.fb.group({
      cohorte: [añoActual, [Validators.required, Validators.min(añoActual - 6)]],
      // fecha_inicio: [fechaActual, Validators.required],
      // fecha_limite: [fechaLimite, Validators.required],
      fecha_inicio: [{value: fechaActual, disabled: true}, Validators.required],
      fecha_limite: [{value: fechaLimite, disabled: true}, Validators.required],
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
