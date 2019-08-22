import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

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
    private notif: NotificationsService
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      documento: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: [null, Validators.required],
      rol: [null, Validators.required]
    });
  }

  enviar() {
    this.showSpinner = true;
    this.usuariosService.crearUsuarios(this.formulario.value).subscribe(
      (resp) => {
        this.crearFormulario();
        this.showSpinner = false;
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

  ngOnInit() {
    this.crearFormulario();
  }

}
