import { Component, OnInit, ViewChild } from '@angular/core';
import { Materia } from '../../modelos/materia';
import { MateriasService } from '../../servicios/materias.service';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { AbrirInscripcionCursadaComponent } from './abrir-inscripcion-cursada/abrir-inscripcion-cursada.component';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Materia>;
  displayedColumns = ['nombre', 'carrera', 'anio', 'tipo_materia', 'correlativas', 'acciones'];
  showSpinner = true;

  constructor(
    private materiasService: MateriasService,
    private notif: NotificationsService,
    public dialog: MatDialog,
  ) { }

  abrirDialogoInscripcion(idMateria: number){
    this.dialog.open(AbrirInscripcionCursadaComponent, {
      data: {
        idMateria: idMateria
      }
    })

  }

  public ListarMaterias() {
    this.materiasService.traerMaterias().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        console.log(res);
      },
      (error) => {
        this.notif.error('Error', error.mensaje);
        console.log(error);
      });
  }

  public eliminar(id: number) {
    const eliminar = confirm('¿Desea eliminar la materia?');
    if (eliminar) {
      this.showSpinner = true;
      this.materiasService.eliminarMateria(id).subscribe(
        (res) => {
          this.ListarMaterias();
          console.log(res);
        },
        (error) => {
          this.showSpinner = false;
          this.notif.error('Error', error.mensaje);
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

  ngOnInit() {
    this.ListarMaterias();

  }

}
