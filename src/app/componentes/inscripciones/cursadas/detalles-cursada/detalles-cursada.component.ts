import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { InscriptosCursada } from 'src/app/modelos/inscriptos-cursada';
import { NotificationsService } from 'angular2-notifications';
import { CargarNotasCursadaComponent } from '../cargar-notas-cursada/cargar-notas-cursada.component';

@Component({
  selector: 'app-detalles-cursada',
  templateUrl: './detalles-cursada.component.html',
  styleUrls: ['./detalles-cursada.component.scss']
})
export class DetallesCursadaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<InscriptosCursada>;
  displayedColumns = ['alumno', 'dni', 'nota_cuat_1', 'nota_cuat_2',
    'nota_recuperatorio', 'asistencia', 'cursa', 'equivalencia', 'acciones'];
  showSpinner = false;

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private notificacions: NotificationsService,
    public dialog: MatDialog,
  ) { }

  listar_inscriptos() {
    const idCursada = this.route.snapshot.params.id;
    this.materiasService.listarInscriptosCursadas(idCursada).subscribe(
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

  cargarNotas(idInscripcionCursada: number) {
    this.dialog.open(CargarNotasCursadaComponent, {
      data: {
        idInscripcionCursada
      }
    });
  }

  eliminarNotas(idInscripcionCursada: number) {
    alert('Por hacer');
  }

  ngOnInit() {
    this.showSpinner = true;
    this.listar_inscriptos();
  }

}
