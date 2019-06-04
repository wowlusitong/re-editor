import React from 'react';
import classNames from 'classnames';

export default class TablePicker extends React.Component {
  state = {
    row: 0,
    column: 0
  };
  handleMouseOver = (row, column) => {
    this.setState({
      row,
      column
    });
  };

  handleClick = event => {
    const { row, column } = this.state;
    this.props.onClick(row, column, event);
  };

  render() {
    const { className } = this.props;
    const { row, column } = this.state;

    return (
      <div className={classNames('table-picker', { [className]: className })}>
        <table>
          <tbody>
            {Array.from({ length: this.props.row }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: this.props.column }).map((_, j) => (
                  <td
                    key={j}
                    className={classNames({ active: i < row && j < column })}
                    onMouseOver={this.handleMouseOver.bind(this, i + 1, j + 1)}
                    onMouseDown={this.handleClick}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-picker-footer">
          {row}x{column}
        </div>
      </div>
    );
  }
}

TablePicker.defaultProps = {
  row: 10,
  column: 10
};
