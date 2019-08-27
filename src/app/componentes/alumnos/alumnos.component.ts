import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { Usuario } from '../../modelos/usuario';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { NotificationsService } from 'angular2-notifications';
import { Alumno } from 'src/app/modelos/alumno';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Alumno>;
  displayedColumns = ['apellido', 'nombre', 'dni', 'email', 'telefono', 'carrera', 'cohorte', 'acciones'];
  showSpinner = true;


  constructor(
    private alumnosService: AlumnosService,
    public dialog: MatDialog,
    private confirmation: ConfirmationDialogService,
    private notif: NotificationsService
  ) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private async listarAlumnos() {
    try {
      const res = await this.alumnosService.traerAlumnos();
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
    const modal = this.dialog.open(CrearAlumnoComponent);
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
    alert('por hacer');
  }

  ngOnInit() {
    this.listarAlumnos();
  }

}
