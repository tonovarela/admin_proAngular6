import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { HospitalesComponent } from '../hospitales/hospitales.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', new Hospital('', '', ''), '');
  esNuevo: boolean = false;

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService

  ) {
    activatedRoute.params.subscribe( params => {
    const id = params['id'];
    if (id !== 'nuevo') {
      this.esNuevo = false;
      this.cargarMedico(id);
    } else {
      this.esNuevo = true;
    }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales(1)
    .subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
     }
     );
     this._modalUploadService.notificacion
     .subscribe( (data) => {
       this.medico.img = data.medico.img;
       });


}



guardarMedico(form: NgForm) {
  if (form.invalid) {
    return;
  }
   this._medicoService.guardarMedico(this.medico).subscribe( (medico: Medico) => {
     if (this.esNuevo ) {
      swal('Médico registrado', medico.nombre, 'success');
     } else {
      swal('Médico actualizado', medico.nombre, 'success');
     }
    this.medico._id = medico._id;
    this._router.navigate(['/medico/' + medico._id]);
   });
}


cambioHospital(id: string) {
  this._hospitalService.obtenerHospital(id)
  .subscribe((hospital: Hospital) => this.medico.hospital = hospital );

}

cargarMedico(id: string) {
  this._medicoService.cargarMedico(id)
    .subscribe( (medico) => {
     this.medico.hospital = medico.hospital._id;
      this.medico = medico;
    } );
}

cambiarFoto() {

  this._modalUploadService.mostrarModal('medicos', this.medico._id);

}

}
