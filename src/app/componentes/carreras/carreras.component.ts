import { Component, OnInit, ViewChild } from '@angular/core';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { Carrera } from 'src/app/modelos/carrera';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { AbrirInscripcionCarreraComponent } from './abrir-inscripcion-carrera/abrir-inscripcion-carrera.component';
import { HelperService } from 'src/app/servicios/helper.service';
import { CrearCarreraComponent } from './crear-carrera/crear-carrera.component';
import { CrearMateriaComponent } from '../materias/crear-materia/crear-materia.component';
import { InfoCarreraComponent } from './info-carrera/info-carrera.component';


@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Carrera>;
  displayedColumns = ['nombre', 'nombre_corto', 'resolucion', 'duracion', 'cantidad_materias', 'acciones'];
  showSpinner = true;

  constructor(
    public helper: HelperService,
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
    private confirmation: ConfirmationDialogService,
    public dialog: MatDialog,
  ) { }

  public async listarCarreras(cache = true) {
    try {
      this.showSpinner = true;
      const res = await this.carrerasService.traerCarreras(cache);
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

  public async eliminar(id: number) {
    const eliminar = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar la carrera?');
    // const eliminar = confirm('¿Desea eliminar la carrera?');
    if (eliminar) {
      this.showSpinner = true;
      this.carrerasService.eliminarCarrera(id).subscribe(
        (resp) => {
          this.listarCarreras();
          this.notif.success(resp.mensaje);
          console.log(resp);
        },
        (error) => {
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
          console.log(error);
        });
    }
  }

  public crearMateria(idCarrera: number, carrera: string, duracion: number) {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: {
        idCarrera,
        carrera,
        duracion
      }
    };
    const modal = this.dialog.open(CrearMateriaComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.listarCarreras();
        }
      }
    );
  }

  public abrirInscripcionCarrera(idCarrera: number, carrera: string, duracion: number) {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: {
        idCarrera,
        carrera
      }
    };
    this.dialog.open(AbrirInscripcionCarreraComponent, config);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearCarrera() {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
    };
    const modal = this.dialog.open(CrearCarreraComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.showSpinner = true;
          this.listarCarreras();
        }
      }
    );
  }

  modificarCarrera(carrera: Carrera) {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: carrera
    };
    const modal = this.dialog.open(CrearCarreraComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.showSpinner = true;
          this.listarCarreras();
        }
      }
    );
  }

  detalles(carrera: Carrera) {
    const config: MatDialogConfig = {
      width: '95%',
      data: {
        idCarrera: carrera.id,
        carrera: carrera.nombre,
        duracion: carrera.duracion
      }
    };
    this.dialog.open(InfoCarreraComponent, config);
  }

  ngOnInit() {
    this.listarCarreras();
  }

}
