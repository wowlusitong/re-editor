import React from 'react';

import { setData } from '~/utils/utils'

export default class ReImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.node.data.get('width'),
      height: props.node.data.get('height')
    };
  }

  render() {
    const { node, isSelected } = this.props;
    return (
      <img
        src={node.data.get('src')}
        width={node.data.get('width')}
        height={node.data.get('height')}
      />
    );
  }
}
