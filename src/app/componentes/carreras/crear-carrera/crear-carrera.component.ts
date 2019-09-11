import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Carrera } from 'src/app/modelos/carrera';

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.scss']
})
export class CrearCarreraComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;
  titulo: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearCarreraComponent>,
    private carreraService: CarrerasService,
    private notif: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Carrera,
  ) {
    if (this.data) {
      this.titulo = 'Modificar Carrera';
    } else {
      this.titulo = 'Crear Carrera';
    }
  }

  private crearFormulario() {
    if (this.data) {
      this.formulario = this.fb.group({
        nombre: [this.data.nombre, Validators.required],
        duracion: [this.data.duracion, [Validators.required, Validators.max(5), Validators.min(1)]],
        cantidad_materias: [this.data.cantidad_materias, [Validators.required, Validators.min(1)]],
      });
    } else {
      this.formulario = this.fb.group({
        nombre: ['', Validators.required],
        duracion: [1, [Validators.required, Validators.max(5), Validators.min(1)]],
        cantidad_materias: [1, [Validators.required, Validators.min(1)]],
      });
    }
  }

  enviar() {
    const carrera: Carrera = {
      nombre: this.formulario.value.nombre,
      duracion: this.formulario.value.duracion,
      cantidad_materias: this.formulario.value.cantidad_materias
    };
    this.showSpinner = true;
    if (this.data) {
      this.carreraService.modificarCarrera(carrera, this.data.id).subscribe(
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
    } else {
      this.carreraService.crearCarrera(carrera).subscribe(
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
  }
  public cerrar() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.crearFormulario();
  }

}
