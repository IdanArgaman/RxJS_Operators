import { of, interval, zip, timer, combineLatest, iif } from 'rxjs';
import { map, withLatestFrom, mergeMap } from 'rxjs/operators';

function addText(el, text) {
  const dataDiv = document.createElement('div')
  dataDiv.innerText = text;
  el.appendChild(dataDiv);
}

/////////
// zip //
/////////

function func_zip() {

  // emits the value from interval(1000) only when interval(2000)
  // emits (after all observables emit), so the value emitted from interval(1000) is delayed
  // by 1 second more

  const zipDiv = document.getElementById('zip')
  zip(interval(1000), interval(100))
    .subscribe(values => addText(zipDiv, values.toString()))

}

///////////////////
// combineLatest //
///////////////////

function func_combineLatest() {

  // Emits when any observable emits but they all have to contain
  // data to start the initial emition, so the first emition is delayed
  const combineLatestDiv = document.getElementById('combineLatestDiv')

  //timerOne emits first value at 1s, then once every 4s
  const timerOne = timer(1000, 4000);
  //timerTwo emits first value at 2s, then once every 4s
  const timerTwo = timer(2000, 4000)
  //timerThree emits first value at 3s, then once every 4s
  const timerThree = timer(3000, 4000)

  const combined = combineLatest(timerOne, timerTwo, timerThree);

  const subscribe = combined.subscribe(
    values => addText(combineLatestDiv, values.toString())
  );
}

////////////////////
// withLatestFrom //
////////////////////

function func_withLatestFrom() {

  //interval(5000) controls when to sample data from interval(1000)
  // we can say the interval(5000) is the master that takes data from the
  // slave. The slave MUST contain data in order to the emit some values.

  const withLatestFromDiv = document.getElementById('withLatestFromDiv')
  interval(5000).pipe(withLatestFrom(interval(1000))).subscribe(x => addText(withLatestFromDiv, x.toString()));

}

/////////
// iif //
/////////

function func_iif() {
  // iif accepts a condition function and two Observables. When an Observable
  // returned by the operator is subscribed, condition function will be called

  const iifDiv = document.getElementById('iifDiv')

  const r$ = of('R');
  const x$ = of('X');

  interval(1000).pipe(
    mergeMap(v =>
      iif(
        () => v % 4 === 0,
        r$,
        x$
      ))
  ).subscribe(val => addText(iifDiv, val.toString()));
}
