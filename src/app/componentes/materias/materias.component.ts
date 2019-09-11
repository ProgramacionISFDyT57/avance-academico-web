import { Component, OnInit, ViewChild } from '@angular/core';
import { Materia } from '../../modelos/materia';
import { MateriasService } from '../../servicios/materias.service';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { AbrirInscripcionCursadaComponent } from './abrir-inscripcion-cursada/abrir-inscripcion-cursada.component';
import { AbrirInscripcionFinalComponent } from './abrir-inscripcion-final/abrir-inscripcion-final.component';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { HelperService } from 'src/app/servicios/helper.service';
import { Carrera } from 'src/app/modelos/carrera';
import { CarrerasService } from 'src/app/servicios/carreras.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Materia>;
  displayedColumns = ['nombre', 'carrera', 'anio', 'tipo_materia', 'correlativas', 'ultima_cursada', 'acciones'];
  showSpinner = true;
  filtro;
  materias: Materia[];
  carreras: Carrera[] = [];
  carreraSeleccionada = 'Todas las carreras';

  constructor(
    public helper: HelperService,
    private materiasService: MateriasService,
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
    public dialog: MatDialog,
    private confirmation: ConfirmationDialogService,
  ) { }

  abrirDialogoInscripcion(idMateria: number, materia: string) {
    const config: MatDialogConfig = {
      data: {
        idMateria,
        materia
      }
    };
    const modal = this.dialog.open(AbrirInscripcionCursadaComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.showSpinner = true;
          this.listarMaterias();
        }
      }
    );
  }

  abrirDialogoInscripcionFinal(idMateria: number, materia: string) {
    this.dialog.open(AbrirInscripcionFinalComponent, {
      data: {
        idMateria,
        materia
      }
    });
  }

  private async listarMaterias() {
    try {
      const res = await this.materiasService.traerMaterias();
      this.materias = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showSpinner = false;
      this.filtroCarrera({nombre: this.carreraSeleccionada});
      console.log(res);
    } catch (error) {
      console.error(error);
      this.notif.error(error.error.mensaje);
      this.showSpinner = false;
    }
  }

  private async listarCarreras() {
    try {
      const res = await this.carrerasService.traerCarreras();
      this.carreras = JSON.parse(JSON.stringify(res));
      const todas: Carrera = {
        nombre: 'Todas las carreras',
        cantidad_materias: 0,
        duracion: 0,
        id: 0,
        materias_cargadas: '0',
      };
      this.carreras.unshift(todas);
      this.showSpinner = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.notif.error(error.error.mensaje);
      this.showSpinner = false;
    }
  }

  public async eliminar(id: number) {
    const eliminar = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar la materia?');
    if (eliminar) {
      this.showSpinner = true;
      this.materiasService.eliminarMateria(id).subscribe(
        (res) => {
          this.listarMaterias();
          console.log(res);
        },
        (error) => {
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
          console.error(error);
        });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public filtroCarrera(event) {
    this.filtro = '';
    if (event.nombre === 'Todas las carreras') {
      this.dataSource = new MatTableDataSource(this.materias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      const materias = [];
      for (const materia of this.materias) {
        if (materia.carrera === event.nombre) {
          materias.push(materia);
        }
      }
      this.dataSource = new MatTableDataSource(materias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit() {
    this.listarCarreras();
    this.listarMaterias();
  }

}
