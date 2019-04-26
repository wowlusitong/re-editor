import React from 'react';
import Editor, { utils } from '@re-editor/core';
import Toolbar from '@re-editor/toolbar-antd';

export default class ReEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.ref = React.createRef();
    this.state = {
      value: props.value || utils.initialValue
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  handleChange = value => {
    this.setState({
      value
    });
    this.props.onChange(value);
  };

  render() {
    const { placeholder, readOnly, onImageUpload } = this.props;
    const { value } = this.state;

    return (
      <div className="re-editor-container">
        {this.editor.current && (
          <Toolbar value={value} editor={this.editor.current.editor.current} />
        )}
        <Editor
          autoFocus
          placeholder={placeholder}
          ref={this.editor}
          value={value}
          onChange={this.handleChange}
          readOnly={readOnly}
          onImageUpload={onImageUpload}
        />
      </div>
    );
  }
}
ReEditor.defaultProps = {
  placeholder: '请输入内容',
  readOnly: false
};
