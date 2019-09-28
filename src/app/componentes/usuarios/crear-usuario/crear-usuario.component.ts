import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { Usuario } from 'src/app/modelos/usuario';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;

  añoActual = new Date().getFullYear();
  startDate = new Date(this.añoActual - 30, 0, 1);
  minDate = new Date(this.añoActual - 100, 0, 1);
  maxDate = new Date(this.añoActual - 15, 11, 31);

  roles = [
    // { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'Directivo' },
    { value: 3, viewValue: 'Preceptor' },
    { value: 4, viewValue: 'Profesor' },
  ];

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private notif: NotificationsService,
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,

  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: [null],
      // fecha_nacimiento: [{value: null, disabled: true}],
      id_rol: [null, Validators.required],
      nombre: ['', Validators.required],
      telefono: [''],
      domicilio: ['']
    });
  }

  enviar() {
    this.showSpinner = true;
    const usuario: Usuario = {
      apellido: this.formulario.value.apellido,
      dni: this.formulario.value.dni,
      email: this.formulario.value.email,
      fecha_nacimiento: this.formulario.value.fecha_nacimiento,
      id_rol: this.formulario.value.id_rol,
      nombre: this.formulario.value.nombre,
      telefono: this.formulario.value.telefono,
      domicilio: this.formulario.value.domicilio
    };
    this.usuariosService.crearUsuario(usuario).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.dialogRef.close(true);
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

  ngOnInit() {
    this.crearFormulario();
  }

}
