import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuarios } from '../../modelos/usuarios';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuarios[] = [];

  constructor(private usuariosService: UsuariosService,
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
