import xs, {Stream, MemoryStream} from 'xstream';
import {div, span, input, VNode} from '@cycle/dom';
import {DOMSource} from '@cycle/dom/xstream-typings';

export interface ColorSliderProps {
  color: string;
  min: number;
  max: number;
  initial: number;
}

export type Sources = {
  DOM: DOMSource,
  props$: Stream<ColorSliderProps>
}
export type Sinks = {
  DOM: Stream<VNode>,
  value$: MemoryStream<number>
}

function ColorSlider(sources: Sources): Sinks {
  let props$: Stream<ColorSliderProps> = sources.props$;
  let initialValue$ = props$.map(props => props.initial).take(1);
  let newValue$ = sources.DOM.select('.slider').events('input')
    .map(ev => parseInt((<HTMLInputElement> ev.target).value));
  let value$ = xs.merge(initialValue$, newValue$).remember();

  let vtree$ = xs.combine(props$, value$)
    .map(([props, value]) =>
      div('.color-slider', [
        span('.color', [ props.color + ' ' + value ]),
        input('.slider', {
          attrs: {type: 'range', min: props.min, max: props.max, value: value}
        })
      ])
    );

  return {
    DOM: vtree$,
    value$: value$
  };
}

export default ColorSlider;