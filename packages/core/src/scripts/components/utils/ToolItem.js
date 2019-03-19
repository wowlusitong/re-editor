import React from 'react';
import Tooltip from 'rc-tooltip';
import classNames from 'classnames';

export default class ToolItem extends React.Component {
  handleClick = event => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const { children, tip, hover } = this.props;
    return (
      <Tooltip
        placement="top"
        mouseEnterDelay="0.2"
        overlay={() => <div>{tip}</div>}
      >
        <div
          className={classNames('tool-item', { hover })}
          onClick={this.handleClick}
        >
          {children}
        </div>
      </Tooltip>
    );
  }
}

ToolItem.Split = () => <span className="tool-item-split" />;

ToolItem.Group = props => <div {...props} className="tool-item-group" />;
