import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { InscriptosCarrera } from 'src/app/modelos/inscriptos-carrera';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { CarrerasService } from 'src/app/servicios/carreras.service';

@Component({
  selector: 'app-detalles-carrera',
  templateUrl: './detalles-carrera.component.html',
  styleUrls: ['./detalles-carrera.component.scss']
})
export class DetallesCarreraComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<InscriptosCarrera>;
  displayedColumns = ['alumno', 'dni'];
  showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private carrerasService: CarrerasService,
    private notificacions: NotificationsService
  ) { }

  listar_inscriptos() {
    const idCarreraAbierta = this.route.snapshot.params.id;
    this.carrerasService.listarInscriptosCarrera(idCarreraAbierta).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        console.log(res);
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
        this.notificacions.error('Error al listar los inscriptos');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.showSpinner = true;
    this.listar_inscriptos();
  }

}
