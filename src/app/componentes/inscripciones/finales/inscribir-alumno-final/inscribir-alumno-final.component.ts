import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscribir-alumno-final',
  templateUrl: './inscribir-alumno-final.component.html',
  styleUrls: ['./inscribir-alumno-final.component.scss']
})
export class InscribirAlumnoFinalComponent implements OnInit {

  showSpinner = true;
  alumnos: Alumno[];
  idAlumno: number;
  carrera: string;
  idCarreraAbierta: number;

  constructor(
    private notif: NotificationsService,
    private alumnosService: AlumnosService,
    private carrerasService: CarrerasService,
    public dialogRef: MatDialogRef<InscribirAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.showSpinner = true;
    this.carrerasService.inscribirAlumnoACarrera(this.idCarreraAbierta, this.idAlumno).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.notif.success(resp.mensaje);
        console.log(resp);
        this.dialogRef.close(true);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.error(error);
      }
    );
  }

  async listarAlumnos() {
    this.alumnos = await this.alumnosService.traerAlumnos();
    console.log(this.alumnos);
    this.showSpinner = false;
  }

  ngOnInit() {
    this.idCarreraAbierta = this.data.idCarreraAbierta;
    this.carrera = this.data.carrera;
    this.listarAlumnos();
  }

}
