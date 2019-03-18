import React from 'react';
import ReEditor from 're-editor';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: JSON.parse(localStorage.getItem('re-editor-value'))
    };
  }

  handleChange = value => {
    localStorage.setItem('re-editor-value', JSON.stringify(value.toJS()));
  };

  render() {
    const { value } = this.state;
    return (
      <div className="container">
        <h1>ReEditor</h1>
        <ReEditor
          value={value}
          onChange={this.handleChange}
          placeholder="请输入内容"
        />
      </div>
    );
  }
}
