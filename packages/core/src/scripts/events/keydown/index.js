import space from './space';
import Backspace from './Backspace';
import Enter from './Enter';
import Tab from './Tab';

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
  Enter,
  Tab
};
