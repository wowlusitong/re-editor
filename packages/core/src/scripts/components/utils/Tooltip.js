import React from 'react';

export default class Tooltip extends React.Component {
  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}
