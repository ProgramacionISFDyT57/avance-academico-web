import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';
import { ActivatedRoute } from '@angular/router';
import { InscriptosFinal } from 'src/app/modelos/inscriptos-final';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-planilla-acta-volante',
  templateUrl: './planilla-acta-volante.component.html',
  styleUrls: ['./planilla-acta-volante.component.scss']
})
export class PlanillaActaVolanteComponent implements OnInit {

  public inscriptos: InscriptosFinal[] = [];
  showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private notif: NotificationsService,
    private materiasService: MateriasService,
  ) { }

  listar_inscriptos() {
    const idFinal = this.route.snapshot.params.idMesa;
    this.materiasService.listarInscriptosFinal(idFinal).subscribe(
      (res) => {
        const x: InscriptosFinal = {
          apellido: null,
          nombre: null,
          dni: null,
          fecha_inscripcion: null,
          materia: null,
          fecha_examen: null,
          id_inscripcion_mesa: null,
          nota: null,
          libro: null,
          folio: null,
          carrera: null,
        };
        if (res.length < 25) {
          while (res.length < 25) {
            res.push(x);
          }
        } else if (res.length > 25) {
          while (res.length < 50) {
            res.push(x);
          }
        }
        this.inscriptos = res;
        console.log(res);
        this.showSpinner = false;
        setTimeout( () => {
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
