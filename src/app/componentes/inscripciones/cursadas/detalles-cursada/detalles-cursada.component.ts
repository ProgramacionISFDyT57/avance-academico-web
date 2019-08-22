import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { InscriptosCursada } from 'src/app/modelos/inscriptos-cursada';
import { NotificationsService } from 'angular2-notifications';
import { CargarNotasCursadaComponent } from '../cargar-notas-cursada/cargar-notas-cursada.component';
import { AvanceAcademico } from 'src/app/modelos/avance-academico';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';

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
  materia: string;
  anioCursada: number;
  carrera: string;

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private notif: NotificationsService,
    public dialog: MatDialog,
    public confirmation: ConfirmationDialogService
  ) { }

  listar_inscriptos() {
    const idCursada = this.route.snapshot.params.id;
    this.materiasService.listarInscriptosCursadas(idCursada).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        if (res.length) {
          this.materia = res[0].materia;
          this.carrera = res[0].carrera;
          this.anioCursada = res[0].anio_cursada;
        }
        console.log(res);
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
        this.notif.error(error.error.mensaje);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarNotas(alumno: InscriptosCursada) {
    const avance: AvanceAcademico = {
      asistencia: alumno.asistencia,
      id_inscripcion_cursada: alumno.id_inscripcion_cursada,
      nota_cuat_1: alumno.nota_cuat_1,
      nota_cuat_2: alumno.nota_cuat_2,
      nota_recuperatorio: alumno.nota_recuperatorio
    };
    this.dialog.open(CargarNotasCursadaComponent, {
      data: avance
    });
  }

  async eliminarNotas(idInscripcionCursada: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar las notas cargadas?');
    if (confirm) {
      this.showSpinner = true;
      this.materiasService.eliminarNotasCursada(idInscripcionCursada).subscribe(
        (res) => {
          this.notif.success(res.mensaje);
          this.listar_inscriptos();
          console.log(res);
        },
        (error) => {
          this.showSpinner = false;
          console.error(error);
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  ngOnInit() {
    this.showSpinner = true;
    this.listar_inscriptos();
  }

}
