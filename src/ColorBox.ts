import xs, {Stream, MemoryStream} from 'xstream';
import {h2, div, VNode} from '@cycle/dom';
import {DOMSource} from '@cycle/dom/xstream-typings';
import isolate from '@cycle/isolate';
import ColorSlider, {ColorSliderProps} from './ColorSlider';

export type Sources = {
  DOM: DOMSource
}
export type Sinks = {
  DOM: Stream<VNode>
}

function ColorBox(sources: Sources): Sinks {
  let RedSlider = isolate(ColorSlider);
  let GreenSlider = isolate(ColorSlider);
  let BlueSlider = isolate(ColorSlider);

  let redProps$ = xs.of<ColorSliderProps>({
    color: 'Red', min: 0, max: 255, initial: 0
  }).remember();
  let greenProps$ = xs.of<ColorSliderProps>({
    color: 'Green', min: 0, max: 255, initial: 0
  }).remember();
  let blueProps$ = xs.of<ColorSliderProps>({
    color: 'Blue', min: 0, max: 255, initial: 0
  }).remember();

  let redSlider = RedSlider({DOM: sources.DOM, props$: redProps$});
  let greenSlider = GreenSlider({DOM: sources.DOM, props$: greenProps$});
  let blueSlider = BlueSlider({DOM: sources.DOM, props$: blueProps$});

  const numToHex = (num) => {
    let hex = num.toString(16);
  }

  let colorBox$ = xs.combine(redSlider.value$, greenSlider.value$, blueSlider.value$)
    .map((colors) => {
      return colors
      .map((color: number) => color.toString(16))
      .map((hex: string) => {
        if (hex.length == 1) return "0" + hex;
        return hex;
      })
      .reduce((acc: string, curr: string) => {
        return acc + curr;
      }, "#")
    }).remember();

  return {
    DOM: xs.combine(colorBox$, redSlider.DOM, greenSlider.DOM, blueSlider.DOM)
      .map(([colorBox, redVTree, greenVTree, blueVTree]) => 
        div([
          redVTree,
          greenVTree,
          blueVTree,
          h2('Color Hex is ' + colorBox)
        ])  
      )
  };
}

export default ColorBox;