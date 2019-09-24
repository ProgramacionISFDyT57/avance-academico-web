import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Materia } from 'src/app/modelos/materia';
import { TiposMateria } from 'src/app/modelos/tipos-materia';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.scss']
})
export class EditarMateriaComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;
  actualizar = false;
  tiposMaterias: TiposMateria[];
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
    console.log(this.data);
    this.formulario = this.fb.group({
      id: [this.data.id],
      nombre: [this.data.nombre, Validators.required],
      anio: [this.data.anio, Validators.required],
      id_tipo: [this.data.id_tipo, Validators.required],
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
      id_tipo: this.formulario.value.id_tipo,
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

  private async listarTiposMaterias() {
    try {
      this.tiposMaterias = await this.materiasService.listarTiposMaterias();
    } catch (error) {
      this.notif.error(error.error.mensaje);
      console.error(error);
      this.showSpinner = false;
    }
  }

  ngOnInit() {
    console.log(this.data);
    this.duracion = this.data.duracion_carrera;
    this.listarTiposMaterias();
    this.crearArregloAños(this.duracion);
    this.crearFormulario();
  }

}
