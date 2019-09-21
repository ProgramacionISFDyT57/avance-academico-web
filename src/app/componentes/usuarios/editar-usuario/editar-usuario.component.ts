import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;

  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private notif: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      id: [this.data.id, Validators.required],
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
    const usuario: Usuario = {
      id: this.formulario.value.id,
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      dni: this.formulario.value.dni,
      email: this.formulario.value.email,
      telefono: this.formulario.value.telefono,
      fecha_nacimiento: this.formulario.value.fecha_nacimiento,
      domicilio: this.formulario.value.domicilio,
    };
    this.usuariosService.editarUsuario(usuario).subscribe(
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
