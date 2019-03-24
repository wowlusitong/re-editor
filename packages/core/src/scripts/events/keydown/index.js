import space from './space';
import Backspace from './Backspace';
import Enter from './Enter';

export function getKeyDownType(event) {
  return (
    {
      ' ': 'space'
    }[event.key] || event.key
  );
}

export default {
  space,
  Backspace,
  Enter
};
