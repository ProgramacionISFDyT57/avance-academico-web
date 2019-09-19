import { Component, OnInit } from '@angular/core';
import { PlanillaInscriptosCursada, InscriptoCursada } from 'src/app/modelos/planilla-inscriptos-cursada';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';

@Component({
  selector: 'app-planilla-asistencia',
  templateUrl: './planilla-asistencia.component.html',
  styleUrls: ['./planilla-asistencia.component.scss']
})
export class PlanillaAsistenciaComponent implements OnInit {

  public planilla: PlanillaInscriptosCursada;
  public inscriptos: InscriptoCursada[][] = [];
  public paginas: number[] = [];
  public columnas = [];
  showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private notif: NotificationsService,
    private materiasService: MateriasService,
  ) { }

  listar_inscriptos() {
    const idCursada = this.route.snapshot.params.idCursada;
    this.materiasService.planillaInscriptosCursadas(idCursada).subscribe(
      (res) => {
        console.log(res);

        const x: InscriptoCursada = {
          apellido: null,
          nombre: null,
          cohorte: null,
          fecha_inscripcion: null,
          cursa: null
        };
        while (res.inscriptos.length % 20 !== 0) {
          res.inscriptos.push(x);
        }
        // for (let i = 0 ; i < 20 ; i++) {
        //   res.inscriptos.push(x);
        // }
        this.planilla = res;
        const paginas = res.inscriptos.length / 20;
        for (let i = 0; i < paginas; i++) {
          this.paginas.push(i);
          this.inscriptos[i] = [];
          for (let j = i * 20; j < (i + 1) * 20; j++) {
            this.inscriptos[i].push(res.inscriptos[j]);
          }
        }
        this.showSpinner = false;
        // setTimeout(() => {
        //   window.print();
        // }, 200);
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
        this.notif.error(error.error.mensaje);
      }
    );
  }

  public imprimir() {
    window.print();
  }

  ngOnInit() {
    this.columnas.length = 30;
    this.listar_inscriptos();
  }

}
