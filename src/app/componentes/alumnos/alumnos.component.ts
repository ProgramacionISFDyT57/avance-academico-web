import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { NotificationsService } from 'angular2-notifications';
import { Alumno } from 'src/app/modelos/alumno';
import { Router } from '@angular/router';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Alumno>;
  displayedColumns = ['apellido', 'nombre', 'dni', 'email', 'telefono', 'carrera', 'libro', 'folio', 'cohorte', 'acciones'];
  showSpinner = true;


  constructor(
    private alumnosService: AlumnosService,
    public dialog: MatDialog,
    private confirmation: ConfirmationDialogService,
    private notif: NotificationsService,
    private router: Router
  ) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public async listarAlumnos(cache = true) {
    try {
      this.showSpinner = true;
      const res = await this.alumnosService.traerAlumnos(cache);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showSpinner = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.notif.error(error.error.mensaje);
      this.showSpinner = false;
    }
  }

  crearAlumno() {
    const config: MatDialogConfig = {
      width: '700px',
      maxWidth: '90%'
    };
    const modal = this.dialog.open(CrearAlumnoComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.showSpinner = true;
          this.listarAlumnos();
        }
      }
    );
  }

  async resetearPassword(idAlumno: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea resetear la contraseña del alumno a su numero de DNI?');
    if (confirm) {
      this.showSpinner = true;
      this.alumnosService.resetContraseñaAlumno(idAlumno).subscribe(
        (res) => {
          this.notif.success(res.mensaje);
          console.log(res);
          this.showSpinner = false;
        },
        (error) => {
          console.log(error);
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  editarAlumno(alumno: Alumno) {
    const config: MatDialogConfig = {
      width: '700px',
      maxWidth: '90%',
      data: alumno
    };
    const modal = this.dialog.open(EditarAlumnoComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.showSpinner = true;
          this.listarAlumnos();
        }
      }
    );
  }

  async eliminar(id: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar el alumno?');
    if (confirm) {
      this.showSpinner = true;
      this.alumnosService.eliminarAlumno(id).subscribe(
        (resp) => {
          this.listarAlumnos();
          this.notif.success(resp.mensaje);
          console.log(resp);
        },
        (error) => {
          this.showSpinner = false;
          console.log(error);
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  detalles(idAlumno: number) {
    this.router.navigateByUrl('/avance_academico/' + idAlumno);
  }

  ngOnInit() {
    this.listarAlumnos();
  }

}
