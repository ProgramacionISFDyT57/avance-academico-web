import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { InscriptoFinal } from 'src/app/modelos/inscriptos-final';
import { MateriasService } from 'src/app/servicios/materias.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { Final } from 'src/app/modelos/final';
import { CargaNotasFinalComponent } from '../carga-notas-final/carga-notas-final.component';
import { InscribirAlumnoFinalComponent } from '../inscribir-alumno-final/inscribir-alumno-final.component';

@Component({
  selector: 'app-detalles-final',
  templateUrl: './detalles-final.component.html',
  styleUrls: ['./detalles-final.component.scss']
})
export class DetallesFinalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<InscriptoFinal>;
  displayedColumns = ['alumno', 'dni', 'nota', 'libro', 'folio', 'acciones'];
  showSpinner = true;
  carrera: string;
  materia: string;
  idMesa: string;
  idCarrera: string;
  fechaExamen: string;

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private notif: NotificationsService,
    public confirmation: ConfirmationDialogService,
    public dialog: MatDialog,
  ) { }

  inscribirAlumnoFinal(materia: string, fechaExamen: string, idMesa: number, idCarrera: number) {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: {
        materia: this.materia,
        fechaExamen: this.fechaExamen,
        idMesa: this.idMesa,
        idCarrera: this.idCarrera
      }
    };
    const modal = this.dialog.open(InscribirAlumnoFinalComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.listar_inscriptos();
        }
      }
    );
  }

  listar_inscriptos() {
    const idMesa = this.route.snapshot.params.id;
    this.materiasService.listarInscriptosMesa(idMesa).subscribe(
      (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.inscriptos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.carrera = res.carrera;
        this.materia = res.materia;
        this.idMesa = res.id_mesa;
        this.idCarrera = res.id_carrera;
        this.fechaExamen = res.fecha_examen;
        this.showSpinner = false;
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

  cargarNotas(alumno: InscriptoFinal) {
    const final: Final = {
      nota: alumno.nota,
      folio: alumno.folio,
      libro: alumno.libro,
      id_inscripcion_mesa: alumno.id_inscripcion_mesa
    };
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: final
    };
    const modal = this.dialog.open(CargaNotasFinalComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.showSpinner = true;
          this.listar_inscriptos();
        }
      }
    );
  }

  async eliminarNotas(idInscripcionMesa: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar las notas cargadas?');
    if (confirm) {
      this.showSpinner = true;
      this.materiasService.eliminarNotasFinal(idInscripcionMesa).subscribe(
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
