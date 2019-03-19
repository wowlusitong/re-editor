import React from 'react';

const Icon = ({ type, color, size, ...rest }) => (
  <i
    {...rest}
    className={`iconfont ${type}`}
    style={{ color: color || 'black', fontSize: size || '16px' }}
  />
);

export default Icon;
