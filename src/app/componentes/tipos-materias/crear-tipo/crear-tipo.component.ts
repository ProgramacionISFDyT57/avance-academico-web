import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MateriasService } from 'src/app/servicios/materias.service';
import { NotificationsService } from 'angular2-notifications';
import { TiposMateria } from 'src/app/modelos/tipos-materia';

@Component({
  selector: 'app-crear-tipo',
  templateUrl: './crear-tipo.component.html',
  styleUrls: ['./crear-tipo.component.scss']
})
export class CrearTipoComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;
  titulo: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearTipoComponent>,
    private materiasService: MateriasService,
    private notif: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: TiposMateria,
  ) {
    if (this.data) {
      this.titulo = 'Modificar Tipo de Materia';
    } else {
      this.titulo = 'Crear Tipo de Materia';
    }
  }

  private crearFormulario() {
    if (this.data) {
      this.formulario = this.fb.group({
        id: [this.data.id],
        nombre: [this.data.nombre, Validators.required],
        asistencia: [this.data.asistencia, [Validators.required, Validators.max(100), Validators.min(0)]],
        libre: [this.data.libre, [Validators.required]]
      });
    } else {
      this.formulario = this.fb.group({
        nombre: ['', Validators.required],
        asistencia: [60, [Validators.required, Validators.max(100), Validators.min(0)]],
        libre: [true, [Validators.required]]
      });
    }
  }

  enviar() {
    const tm: TiposMateria = {
      id: this.formulario.value.id,
      nombre: this.formulario.value.nombre,
      asistencia: this.formulario.value.asistencia,
      libre: this.formulario.value.libre,
    };
    this.showSpinner = true;
    if (this.data) {
      this.materiasService.editarTipoMateria(tm).subscribe(
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
      this.materiasService.crearTipoMateria(tm).subscribe(
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
