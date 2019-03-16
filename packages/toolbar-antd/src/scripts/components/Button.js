import React from 'react';
import { Button as AntButton, Tooltip } from 'antd';
import { command, utils } from '@re-editor/core';

import Icon from '~/components/Icon';
import Context from '~/components/Context';

export default class Button extends React.Component {
  handleMouseDown = (event) => {
    event.preventDefault();

    const { type } = this.props;
    const { editor } = this.context;
    command(editor)(type);
  }

  isActive = () => {
    const { type } = this.props;
    const { value, editor } = this.context;
    return utils.isActive(utils.toValue(value), type);
  }

  render() {
    const { type, title } = this.props;

    return (
      <Tooltip title={title || type}>
        <AntButton
          size="small"
          onMouseDown={this.handleMouseDown}
          type={this.isActive() ? 'primary' : ''}
          >
          <Icon type={`icon-${type}`} />
        </AntButton>
      </Tooltip>
    )
  }
}
Button.Group = AntButton.Group;
Button.contextType = Context;
