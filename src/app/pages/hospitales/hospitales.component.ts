import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
cargando: boolean = false;
hospitales: Hospital[] = [];
totalRegistros: number = 0;
desde: number = 0;
  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarHospitales();
    } );
  }

  crearHospital() {
    swal({
      text: 'Escribe el nombre del hospital:',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
  })
    .then((value) => {
      if (!value ||  value.length === 0) {
      return;
      } else {
        this._hospitalService.crearHospital(value)
        .subscribe( resp => this.cargarHospitales());
      }
      swal('Hospital Agregado', `El hospital: ${value} ha sido dado de alta`, 'success');

    });
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor ;
    if (desde >= this.totalRegistros || desde < 0) {
      return ;
    }
   this.desde += valor ;
   this.cargarHospitales();

  }

  mostrarModal(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);

  }
  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
      }
      this.cargando = true;
      this._hospitalService.buscarHospital(termino).subscribe((resp: Hospital[]) => {
        this.hospitales = resp;
        this.cargando = false;
      } );
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe(() => swal('Hospital actualizado', hospital.nombre, 'success'));
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });

  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar al hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true ,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
         this._hospitalService.borrarHospital(hospital._id)
         .subscribe( resp => {
          console.log(resp);
          this.cargarHospitales();
         });
      }
    });


   }

}
