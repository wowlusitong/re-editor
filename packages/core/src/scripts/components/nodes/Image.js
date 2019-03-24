import React from 'react';

import { setData } from '~/utils/utils';

export default class ReImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.node.data.get('width'),
      height: props.node.data.get('height')
    };
  }

  componentDidMount() {
    const { node, editor } = this.props;
    if (this.state.width == null && this.state.height == null) {
      const img = new Image();
      img.src = node.getIn(['data', 'src']);
      img.onload = () => {
        const width = String(img.width);
        const height = String(img.height);
        this.setState({
          width,
          height
        });
        setData(editor, node, d => d.set('width', width).set('height', height));
      };
    }
  }

  render() {
    const { node, children } = this.props;
    return (
      <>
        <img
          src={node.data.get('src')}
          width={node.data.get('width')}
          height={node.data.get('height')}
        />
        {children}
      </>
    );
  }
}
