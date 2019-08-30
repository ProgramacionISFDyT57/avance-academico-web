import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.scss']
})
export class CambioClaveComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;

  roles = [
    { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'Directivo' },
    { value: 3, viewValue: 'Preceptor' },
    { value: 4, viewValue: 'Profesor' },
  ];

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private notif: NotificationsService,
    public dialogRef: MatDialogRef<CambioClaveComponent>,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      claveVieja: ['', Validators.required],
      claveNueva: ['', Validators.required],
      claveNueva2: ['', Validators.required],
    });
  }

  enviar() {
    this.showSpinner = true;
    const claveVieja = this.formulario.value.claveVieja;
    const claveNueva = this.formulario.value.claveNueva;
    this.usuariosService.cambiarContraseña(claveVieja, claveNueva).subscribe(
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
    this.crearFormulario();
  }

}
