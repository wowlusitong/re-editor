import { isKeyHotkey } from 'is-hotkey';

import space from './space';
import Backspace from './Backspace';
import Enter from './Enter';
import Tab from './Tab';
import modEnter from './modEnter';

export function getKeyDownType(event) {
  if (isKeyHotkey('mod+enter', event)) {
    return 'modEnter';
  }
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
  Tab,
  modEnter
};
