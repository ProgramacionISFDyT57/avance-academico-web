import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { Carrera } from 'src/app/modelos/carrera';

@Component({
  selector: 'app-inscripciones-finales',
  templateUrl: './inscripciones-finales.component.html',
  styleUrls: ['./inscripciones-finales.component.scss']
})

export class InscripcionesFinalesComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Carrera>;
  //displayedColumns = ['nombre', 'duracion', 'cantidad_materias', 'acciones'];
displayedColumns = ['materia', 'profesor', 'fecha_examen', 'fecha_inicio', 'fecha_limite'];
  showSpinner = true;


  constructor(
    private materiasService: MateriasService,
    private notif: NotificationsService
  ) { }

  public ListarFinales() {
    this.materiasService.listarFinales().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        console.log(res);
      },
      (error) => {
        // this.showSpinner = false;
        this.notif.error('Error', error.mensaje);
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
    this.ListarFinales();
  }


}
