import React from 'react';
import { findDOMNode } from 'react-dom';
import throttle from 'lodash/throttle';

import { setData } from '~/utils/utils';
import Icon from '~/components/utils/Icon';

export default class ReImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.node.data.get('width'),
      height: props.node.data.get('height'),
      isResize: false
    };
    this.handleResize = throttle(this.handleResize, 100);
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
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleResize);
    window.addEventListener('blur', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleResize);
    window.removeEventListener('blur', this.handleMouseUp);
  }

  handleMouseDown = () => {
    const rect = findDOMNode(this).getBoundingClientRect();
    this.x = rect.x;
    this.y = rect.y;
    this.setState({
      isResize: true
    });
  };

  handleMouseUp = () => {
    if (this.state.isResize) {
      this.setState({
        isResize: false
      });
    }
  };

  handleResize = event => {
    if (this.state.isResize) {
      const { editor, node } = this.props;
      const { width, height } = this.state;
      const [newWidth, newHeight] = [
        parseInt(event.x - this.x),
        parseInt(event.y - this.y)
      ];
      const [widthRate, heightRate] = [newWidth / width, newHeight / height];
      setData(editor, node, d =>
        heightRate > widthRate
          ? d
              .set('width', parseInt(width * heightRate))
              .set('height', newHeight)
          : d.set('width', newWidth).set('height', parseInt(height * widthRate))
      );
    }
  };

  render() {
    const { node, children } = this.props;
    return (
      <div className="image-container">
        <Icon
          type="icon-resize"
          color="#fff"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <img
          src={node.data.get('src')}
          width={node.data.get('width')}
          height={node.data.get('height')}
        />
        {children}
      </div>
    );
  }
}
