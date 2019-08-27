import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/servicios/helper.service';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-avance-academico',
  templateUrl: './avance-academico.component.html',
  styleUrls: ['./avance-academico.component.scss']
})
export class AvanceAcademicoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['anio', 'nombre_materia', 'cursada', 'final', 'tomo', 'folio'];
  showSpinner = true;
  alumno: string;
  carrera: string;
  cohorte: number;
  dni: string;
  domicilio: string;
  nacimiento: string;
  telefono: string;
  tomo: string;
  folio: number;

  constructor(
    public helper: HelperService,
    private alumnosService: AlumnosService,
    private notif: NotificationsService,
    private router: Router,
    private confirm: ConfirmationDialogService,
    public dialog: MatDialog,
  ) { }

  public avanceAcademico() {
    this.alumnosService.avanceAcademico().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        this.alumno = res[0].alumno;
        this.carrera = res[0].carrera;
        this.cohorte = res[0].cohorte;
        this.dni = res[0].dni;
        this.domicilio = res[0].domicilio;
        this.nacimiento = res[0].nacimiento;
        this.telefono = res[0].telefono;
        this.tomo = res[0].tomo;
        this.folio = res[0].folio;
        console.log(res);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.log(error);
      });
  }

  ngOnInit() {
    this.avanceAcademico();
  }

}
