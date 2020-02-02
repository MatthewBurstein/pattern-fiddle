import { handleMouseMove } from './state';
import { paint } from './canvas';
import { getGlobalState, moveSquares } from './state';
import { width } from './constants';

const interval =
  width < 600 ? 20
  : width < 1000 ? 15
  : 10;

setInterval(() => {
  const state = getGlobalState();
  paint(state);
  moveSquares(state);
}, interval);

window.addEventListener('mousemove', event => {
  const { clientX, clientY } = event;
  handleMouseMove(clientX, clientY);
});

window.addEventListener('touchstart', event => {
  const { pageX, pageY } = event.touches[0];
  handleMouseMove(pageX, pageY);
});

window.addEventListener('touchmove', event => {
  const { pageX, pageY } = event.touches[0];
  handleMouseMove(pageX, pageY);
});
