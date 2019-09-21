import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Materia } from 'src/app/modelos/materia';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.scss']
})
export class EditarMateriaComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;
  actualizar = false;
  duracion: number;
  anios: number[] = [];

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<EditarMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Materia,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      id: [this.data.id],
      nombre: [this.data.nombre, Validators.required],
      anio: [this.data.anio, Validators.required],
      horas: [this.data.horas]
    });
  }

  private crearArregloAños(duracion: number) {
    for (let x = 1 ; x <= duracion ; x++) {
      this.anios.push(x);
    }
  }

  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.showSpinner = true;
    const materia: Materia = {
      id: this.formulario.value.id,
      nombre: this.formulario.value.nombre,
      anio: this.formulario.value.anio,
      horas: this.formulario.value.horas
    };
    this.materiasService.editarMateria(materia).subscribe(
      (resp) => {
        console.log(resp);
        this.notif.success(resp.mensaje);
        this.showSpinner = false;
        this.dialogRef.close(true);
      },
      (error) => {
        console.error(error);
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
      }
    );
  }

  ngOnInit() {
    console.log(this.data);
    this.duracion = this.data.duracion_carrera;
    this.crearArregloAños(this.duracion);
    this.crearFormulario();
  }

}
