import React from 'react';
import { findDOMNode } from 'react-dom';

export default class ToolWrapper extends React.Component {
  handleClickOutside = event => {
    const dom = findDOMNode(this);
    if (dom && !dom.contains(event.target)) {
      const { onClick } = this.props;
      if (onClick) {
        onClick();
      }
    }
  };

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    return (
      <div className="tool-wrapper" contentEditable={false}>
        {this.props.children}
      </div>
    );
  }
}
