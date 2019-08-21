import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuario } from '../../modelos/usuario';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns = ['apellido', 'nombre', 'dni', 'email', 'telefono', 'rol', 'acciones'];
  showSpinner = true;

  constructor(
    private usuariosService: UsuariosService,
  ) { }

  public ListarUsuarios() {
    this.usuariosService.traerUsuarios().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number) {
    alert('por hacer');
  }

  deshabilitar(id: number) {
    alert('por hacer');
  }

  habilitar(id: number) {
    alert('por hacer');
  }

  ngOnInit() {
    this.ListarUsuarios();
  }

}
