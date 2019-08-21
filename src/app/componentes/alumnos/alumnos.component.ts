
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { Usuario } from '../../modelos/usuario';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns = ['apellido', 'nombre', 'email', 'rol', 'acciones'];
  showSpinner = true;


  constructor(
    private alumnosService: AlumnosService,

  ) { }

  public ListarUsuarios() {
    this.alumnosService.traerAlumnos().subscribe(
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

  ngOnInit() {
    this.ListarUsuarios();
  }

}
