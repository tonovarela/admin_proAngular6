import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input() porcentaje: number = 50;
  @Input() leyenda: string = 'Leyenda';
  @Output() actualizaValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('Leyenda', this.leyenda);
    console.log('porcentaje', this.porcentaje);
  }


  OnChanges( newValue: number ) {
  // let elemenHtml: any = document.getElementsByName('progreso')[0];
    if (newValue >= 100) {
      this.porcentaje = 100;
    }
    if (newValue <= 0) {
     this.porcentaje = 0;
    }
    this.txtProgress.nativeElement.value = this.porcentaje;
    // elemenHtml.value = this.porcentaje;
    this.actualizaValor.emit(this.porcentaje);

  }
  cambiarValor(valor: number) {
    this.porcentaje = this.porcentaje + valor;
    if (this.porcentaje >= 100) {
      this.porcentaje = 100;
    }
    if (this.porcentaje <= 0) {
      this.porcentaje = 0;
    }
    this.actualizaValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('porcentaje', this.porcentaje);
  }
}
