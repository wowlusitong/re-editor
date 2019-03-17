import React from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';

export default class ToolItem extends React.Component {
  handleClick = (event) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(event);
    }
  }

  render() {
    const { children, tip, hover } = this.props;
    return (
      <Tooltip title={tip}>
        <div className={classNames('tool-item', { hover })} onClick={this.handleClick}>
          {children}
        </div>
      </Tooltip>
    );
  }
}

ToolItem.Split = () => <span className="tool-item-split" />

ToolItem.Group = props => (
  <div {...props} className="tool-item-group" />
);
