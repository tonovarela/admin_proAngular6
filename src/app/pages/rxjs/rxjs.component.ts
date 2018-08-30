import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  ngOnDestroy(): void {
    console.log('Saliendo del componente');
    this.subscripcion.unsubscribe();

  }
  constructor() {
    this.subscripcion = this.regresaObservable()
      // .pipe( retry(2) )
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.log(error),
        () => console.log('Acabo')
      );
  }

  ngOnInit() {}


  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (contador === 2) {
        // clearInterval(interval);
        //   observer.error('Auxilio');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => valor % 2 === 1 ? true : false)
    );
  }
}
