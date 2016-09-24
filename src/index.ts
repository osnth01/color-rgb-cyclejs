import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import ColorBox from './ColorBox';

const main = ColorBox;

run(main, {
  DOM: makeDOMDriver('#app')
});