import { of, interval, zip, timer, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

function addText(el, text) {
  const dataDiv = document.createElement('div')
  dataDiv.innerText = text;
  el.appendChild(dataDiv);
}

/////////
// zip //
/////////

// emits the value from interval(1000) only when interval(2000)
// emits (after all observables emit), so the value emitted from interval(1000) is delayed
// by 1 second more

const zipDiv = document.getElementById('zip')
zip(interval(1000), interval(100)).subscribe(values => addText(zipDiv, values.toString()))

///////////////////
// combineLatest //
///////////////////

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
