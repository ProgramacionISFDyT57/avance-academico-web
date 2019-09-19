import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { PlanillaInscriptosCursada, InscriptoCursada } from 'src/app/modelos/planilla-inscriptos-cursada';

@Component({
  selector: 'app-planilla-inscriptos-cursada',
  templateUrl: './planilla-inscriptos-cursada.component.html',
  styleUrls: ['./planilla-inscriptos-cursada.component.scss']
})
export class PlanillaInscriptosCursadaComponent implements OnInit {

  public planilla: PlanillaInscriptosCursada;
  public inscriptos: InscriptoCursada[][] = [];
  public paginas: number[] = [];
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
        while (res.inscriptos.length % 35 !== 0) {
          res.inscriptos.push(x);
        }
        // for (let i = 0 ; i < 35 ; i++) {
        //   res.inscriptos.push(x);
        // }
        this.planilla = res;
        const paginas = res.inscriptos.length / 35;
        for (let i = 0; i < paginas; i++) {
          this.paginas.push(i);
          this.inscriptos[i] = [];
          for (let j = i * 35; j < (i + 1) * 35; j++) {
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
    this.listar_inscriptos();
  }

}
