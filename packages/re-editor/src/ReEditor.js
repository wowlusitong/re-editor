import React from 'react';
import Editor, {utils} from '@re-editor/core';
import Toolbar from '@re-editor/toolbar-antd';

import '@re-editor/core/lib/styles/index.css';

export default class ReEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.ref = React.createRef();
    this.state = {
      value: props.value || utils.initialValue
    }
  }

  componentDidMount() {
    this.forceUpdate();
  }

  handleChange = (value) => {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state;

    return (
      <div className="re-editor-container">
        {this.editor.current && <Toolbar value={value} editor={this.editor.current.editor.current} />}
        <Editor
          autoFocus
          placeholder="请输入内容"
          ref={this.editor}
          value={value}
          onChange={this.handleChange}
          />
      </div>
    )
  }
}
