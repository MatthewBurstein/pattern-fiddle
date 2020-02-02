import { getGlobalState, handleMouseMove } from './state';
import { startSquareAnimation} from './canvas';

startSquareAnimation(getGlobalState());

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
