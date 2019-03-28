import { of, interval, zip, timer, combineLatest, iif } from 'rxjs';
import { map, withLatestFrom, mergeMap } from 'rxjs/operators';

function addText(el, text) {
  const dataDiv = document.createElement('div')
  dataDiv.innerText = text;
  el.appendChild(dataDiv);
}

function createContinaer(name) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(name + ":"));
  document.body.appendChild(d);
  return d;
}

/////////
// zip //
/////////

function func_zip() {

  // emits the value from interval(1000) only when interval(2000)
  // emits (after all observables emit), so the value emitted from interval(1000) is delayed
  // by 1 second more

  const d = createContinaer('zip');

  zip(interval(1000), interval(100))
    .subscribe(values => addText(d, values.toString()))

}

///////////////////
// combineLatest //
///////////////////

function func_combineLatest() {

  const d = createContinaer('combineLatest');

  // Emits when any observable emits but they all have to contain
  // data to start the initial emition, so the first emition is delayed

  //timerOne emits first value at 1s, then once every 4s
  const timerOne = timer(1000, 4000);
  //timerTwo emits first value at 2s, then once every 4s
  const timerTwo = timer(2000, 4000)
  //timerThree emits first value at 3s, then once every 4s
  const timerThree = timer(3000, 4000)

  const combined = combineLatest(timerOne, timerTwo, timerThree);

  const subscribe = combined.subscribe(
    values => addText(d, values.toString())
  );
}

////////////////////
// withLatestFrom //
////////////////////

function func_withLatestFrom() {

  const d = createContinaer('withLatestFrom');

  //interval(5000) controls when to sample data from interval(1000)
  // we can say the interval(5000) is the master that takes data from the
  // slave. The slave MUST contain data in order to the emit some values.

  interval(5000).pipe(withLatestFrom(interval(1000))).subscribe(x => addText(d, x.toString()));

}

/////////
// iif //
/////////

function func_iif() {

  const d = createContinaer('iif');

  // iif accepts a condition function and two Observables. When an Observable
  // returned by the operator is subscribed, condition function will be called

  const r$ = of('R');
  const x$ = of('X');

  interval(1000).pipe(
    mergeMap(v =>
      iif(
        () => v % 4 === 0,
        r$,
        x$
      ))
  ).subscribe(val => addText(d, val.toString()));
}
