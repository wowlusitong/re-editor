import React from 'react';
import { Map } from 'immutable';

export default React.createContext({
  data: new Map(),
  onChangeData: () => {}
});
