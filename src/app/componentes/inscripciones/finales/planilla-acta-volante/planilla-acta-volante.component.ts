import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ActaVolante, Inscriptos } from 'src/app/modelos/acta-volante';

@Component({
  selector: 'app-planilla-acta-volante',
  templateUrl: './planilla-acta-volante.component.html',
  styleUrls: ['./planilla-acta-volante.component.scss']
})
export class PlanillaActaVolanteComponent implements OnInit {

  public actaVolante: ActaVolante;
  public inscriptos: Inscriptos[][] = [];
  public paginas: number[] = [];
  showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private notif: NotificationsService,
    private materiasService: MateriasService,
  ) { }

  listar_inscriptos() {
    const idFinal = this.route.snapshot.params.idMesa;
    this.materiasService.actaVolante(idFinal).subscribe(
      (res) => {
        console.log(res);

        const x = {
          apellido: null,
          nombre: null,
          dni: null,
          cohorte: null,
        };
        while (res.inscriptos.length % 25 !== 0) {
          res.inscriptos.push(x);
        }
        this.actaVolante = res;
        const paginas = res.inscriptos.length / 25;
        for (let i = 0; i < paginas; i++) {
          this.paginas.push(i);
          this.inscriptos[i] = [];
          for (let j = i * 25; j < (i + 1) * 25; j++) {
            this.inscriptos[i].push(res.inscriptos[j]);
          }
        }
        this.showSpinner = false;
        setTimeout(() => {
          window.print();
        }, 200);
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
