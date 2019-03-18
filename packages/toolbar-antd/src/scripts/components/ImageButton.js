import React from 'react';
import { Menu, Dropdown, Button, Tooltip } from 'antd';
import { command } from '@re-editor/core';

import Icon from '~/components/Icon';
import Context from '~/components/Context';

export default class ImageButton extends React.Component {
  handleClick = ({ key }) => {
    const { editor } = this.context;
    command(editor)(key);
  };

  renderMenu = () => {
    return (
      <Menu onMouseDown={this.handleClick}>
        <Menu.Item key="image-local">
          <Tooltip placement="right" title="插入本地图片（支持快捷键粘贴）">
            本地图片
          </Tooltip>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <Dropdown overlay={this.renderMenu}>
        <Button size="small">
          <Icon type="icon-image" />
        </Button>
      </Dropdown>
    );
  }
}

ImageButton.contextType = Context;
