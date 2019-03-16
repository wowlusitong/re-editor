import React from 'react';
import ReEditor from 're-editor';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>ReEditor</h1>
        <ReEditor
          autoFocus
          placeholder="请输入内容"
          />
      </div>
    )
  }
}
