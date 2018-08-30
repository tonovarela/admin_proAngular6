import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {


    this.contar3segundos().then(function() {
        console.log('termino');
      })
      .catch(function(e) {
        console.log('Error en la promesa ', e);
      });
  }

  ngOnInit() {}
  contar3segundos(): Promise<boolean> {
    return  new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
