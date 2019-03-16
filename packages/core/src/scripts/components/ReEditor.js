import React from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';

import nodes from '~/components/nodes';
import marks from '~/components/marks';
import { initialValue } from '~/utils/utils';

export default class ReEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(props.value || initialValue)
    }
    this.editor = React.createRef();
  }


  handleChange = ({ value }) => {
    const { onChange, autoFocus } = this.props;
    this.setState({ value });
    onChange(value);
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;
    const Component = marks[mark.type];
    if (Component) {
      return <Component {...attributes}>{children}</Component>;
    }
    return next();
  }

  renderNode = (props, editor, next) => {
    const { children, node, attributes, ...rest } = props;
    const type = node.type;

    const Component = nodes[type];
    if (Component) {
      return (
        <Component node={node} editor={editor} {...attributes}>
          {children}
        </Component>
      )
    }
    return next();
  }

  render() {
    const { placeholder, autoFocus, className } = this.props;
    const { value } = this.state;

    return (
      <Editor
        value={value}
        onChange={this.handleChange}
        renderMark={this.renderMark}
        renderNode={this.renderNode}
        ref={this.editor}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={className}
      />
    )
  }
}

ReEditor.defaultProps = {
  className: 're-editor'
}
