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
