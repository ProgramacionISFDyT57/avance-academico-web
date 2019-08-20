import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { InscriptosFinal } from 'src/app/modelos/inscriptos-final';
import { MateriasService } from 'src/app/servicios/materias.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-final',
  templateUrl: './detalles-final.component.html',
  styleUrls: ['./detalles-final.component.scss']
})
export class DetallesFinalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<InscriptosFinal>;
  displayedColumns = ['alumno', 'dni', 'nota', 'libro', 'folio', 'acciones'];
  showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private notificacions: NotificationsService
  ) { }

  listar_inscriptos() {
    const idFinal = this.route.snapshot.params.id;
    this.materiasService.listarInscriptosFinal(idFinal).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  cargarNotas(idInscripcionFinal: number) {
    alert('Por hacer');
  }

  eliminarNotas(idInscripcionFinal: number) {
    alert('Por hacer');
  }

  ngOnInit() {
    this.showSpinner = true;
    this.listar_inscriptos();
  }

}
