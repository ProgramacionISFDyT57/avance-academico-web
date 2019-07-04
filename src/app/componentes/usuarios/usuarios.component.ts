import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    private usuariosService: UsuariosService,
  ) { }

  public ListarUsuarios() {
    this.usuariosService.traerUsuarios().subscribe(
      (res) => {
        this.usuarios = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.ListarUsuarios();
  }

}
