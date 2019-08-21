import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { Usuario } from '../../modelos/usuario';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns = ['apellido', 'nombre', 'dni', 'email', 'telefono', 'carrera', 'cohorte', 'acciones'];
  showSpinner = true;


  constructor(
    private alumnosService: AlumnosService,
    public dialog: MatDialog,
    private usuariosService: UsuariosService,
    private confirmation: ConfirmationDialogService,
    private notifications: NotificationsService
  ) { }

  public ListarUsuarios() {
    this.alumnosService.traerAlumnos().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearAlumno() {
    this.dialog.open(CrearAlumnoComponent);
  }

  async eliminar(id: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar el usuario?');
    if (confirm) {
      this.showSpinner = true;
      this.usuariosService.eliminarUsuario(id).subscribe(
        (res) => {
          this.notifications.success(res.mensaje);
          console.log(res);
        },
        (error) => {
          console.log(error);
          this.notifications.error(error.error.mensaje);
        }
      );
    }
  }

  ngOnInit() {
    this.ListarUsuarios();
  }

}
