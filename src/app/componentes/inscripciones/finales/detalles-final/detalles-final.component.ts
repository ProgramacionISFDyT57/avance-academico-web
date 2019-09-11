import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { InscriptosFinal } from 'src/app/modelos/inscriptos-final';
import { MateriasService } from 'src/app/servicios/materias.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { Final } from 'src/app/modelos/final';
import { CargaNotasFinalComponent } from '../carga-notas-final/carga-notas-final.component';

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
  carrera: string;
  materia: string;
  fechaExamen: string;

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private notif: NotificationsService,
    public confirmation: ConfirmationDialogService,
    public dialog: MatDialog,
  ) { }

  listar_inscriptos() {
    const idFinal = this.route.snapshot.params.id;
    this.materiasService.listarInscriptosFinal(idFinal).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
        if (res.length) {
          this.carrera = res[0].carrera;
          this.materia = res[0].materia;
          this.fechaExamen = res[0].fecha_examen;
        }
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

  cargarNotas(alumno: InscriptosFinal) {
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
