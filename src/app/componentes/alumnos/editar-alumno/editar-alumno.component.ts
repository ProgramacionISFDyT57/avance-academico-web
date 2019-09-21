import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { NotificationsService } from 'angular2-notifications';
import { Alumno } from 'src/app/modelos/alumno';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.scss']
})
export class EditarAlumnoComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;

  constructor(
    public dialogRef: MatDialogRef<EditarAlumnoComponent>,
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private notif: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      id_alumno: [this.data.id_alumno, Validators.required],
      nombre: [this.data.nombre, Validators.required],
      apellido: [this.data.apellido, Validators.required],
      dni: [this.data.dni, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      telefono: [this.data.telefono],
      fecha_nacimiento: [this.data.fecha_nacimiento],
      domicilio: [this.data.domicilio],
    });
  }

  enviar() {
    this.showSpinner = true;
    const alumno: Alumno = {
      id_alumno: this.formulario.value.id_alumno,
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      dni: this.formulario.value.dni,
      email: this.formulario.value.email,
      telefono: this.formulario.value.telefono,
      fecha_nacimiento: this.formulario.value.fecha_nacimiento,
      domicilio: this.formulario.value.domicilio
    };
    this.alumnosService.editarAlumno(alumno).subscribe(
      (resp) => {
        console.log(resp);
        this.notif.success(resp.mensaje);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error(error);
        this.notif.error(error.error.mensaje);
      }
    );
  }

  public cerrar() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.crearFormulario();
  }

}
