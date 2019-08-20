import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { Carrera } from 'src/app/modelos/carrera';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-inscripciones-finales',
  templateUrl: './inscripciones-finales.component.html',
  styleUrls: ['./inscripciones-finales.component.scss']
})

export class InscripcionesFinalesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Carrera>;
  displayedColumns = ['carrera', 'materia', 'anio_materia', 'profesor',
   'fecha_inicio', 'fecha_limite', 'fecha_examen', 'cant_inscriptos', 'acciones'];
  showSpinner = true;

  constructor(
    private materiasService: MateriasService,
    private notif: NotificationsService,
    private confirm: ConfirmationDialogService
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

  async inscribirse(materia: string, fecha: string, id: number) {
    const confirm = await this.confirm.confirm('Confirme su inscripción a la mesa de final',
      'Inscripción a ' + materia + ' // Fecha de examen ' + new Date(fecha).toLocaleDateString());
    if (confirm) {
      this.showSpinner = true;
      this.materiasService.inscripcionFinal(id).subscribe(
        (resp) => {
          this.showSpinner = false;
          console.log(resp);
          this.notif.success('Inscripción realizada correctamente');
        },
        (error) => {
          this.showSpinner = false;
          console.error(error);
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  detalles(id) {
    alert('Por hacer');
  }

  eliminar(id) {
    alert('Por hacer');
  }

  ngOnInit() {
    this.ListarFinales();
  }



}
