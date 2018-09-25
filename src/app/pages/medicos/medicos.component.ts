import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
declare var swal: any;
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

    medicos: Medico[] = null;
    cargando: boolean = true;
    desde: number = 0;

  constructor(public _serviceMedico: MedicoService) { }

  ngOnInit() {
   this.cargarMedicos();

  }

  cargarMedicos() {
    this._serviceMedico.cargarMedicos(this.desde).subscribe( (medicos: Medico[]) => {
      this.cargando = false;
       this.medicos = medicos;
    });

  }

   buscarMedico (termino: string) {

    if (termino.length === 0) {
      this.cargarMedicos();
      return;
    }

    this._serviceMedico.buscarMedicos(termino).subscribe( (medicos) => {
    this.medicos = medicos;
    });

   }




   borrarMedico(medico: Medico) {
    swal({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar al medico ' + medico.nombre,
      icon: 'warning',
      buttons: true ,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
         this._serviceMedico.borrarMedico(medico._id)
         .subscribe( resp => {
          this.cargarMedicos();
         });
      }
    });

   }


   cambiarDesde(valor: number) {
    const desde = this.desde + valor ;
    if (desde >= this._serviceMedico.totalMedicos || desde < 0) {
      return ;
    }
   this.desde += valor ;
   this.cargarMedicos();

  }



}
