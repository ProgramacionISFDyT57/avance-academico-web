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

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
  ) { }


  private crearFormulario(){
    this.formulario= this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      Id_Rol: [1, [Validators.required, Validators.max(5), Validators.min(1)]],
      fecha_nacimiento: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.crearFormulario();
  }
  enviar() {
    this.usuariosService.crearUsuarios(this.formulario.value).subscribe(
      (resp) => {
        console.log(resp)
      },
      (error)=> {
        console.error(error)
      }
    )
  }

}