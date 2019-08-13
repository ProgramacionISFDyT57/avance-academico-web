import { Component, OnInit, ViewChild } from '@angular/core';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { CarreraAbierta } from 'src/app/modelos/carreraabierta';


@Component({
  selector: 'app-inscripciones-carreras',
  templateUrl: './inscripciones-carreras.component.html',
  styleUrls: ['./inscripciones-carreras.component.scss']
})
export class InscripcionesCarrerasComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<CarreraAbierta>;
  displayedColumns = ['nombre', 'duracion', 'cohorte', 'fecha_inicio', 'fecha_limite', 'cant_inscriptos'];

  showSpinner = true;


  constructor(
    private carrerasService: CarrerasService,
    private notif: NotificationsService
  ) { }

  public ListarCarreras() {
    this.carrerasService.traerCarrerasAbiertas().subscribe(
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
    this.ListarCarreras();
  }


}
