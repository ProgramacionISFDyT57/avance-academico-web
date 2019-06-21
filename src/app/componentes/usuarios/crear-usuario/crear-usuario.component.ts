import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {


  formulario: FormGroup;

  foods = [
    { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'Directivo' },
    { value: 3, viewValue: 'Preceptor' },
    { value: 4, viewValue: 'Profesor' },
    { value: 5, viewValue: 'Alumno' }

  ];



  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
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

  ngOnInit() {
    this.crearFormulario();
  }
  enviar() {
    this.usuariosService.crearUsuarios(this.formulario.value).subscribe(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
