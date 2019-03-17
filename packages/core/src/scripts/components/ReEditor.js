import React from 'react';
import { Value } from 'slate';
import { Editor, getEventTransfer } from 'slate-react';
import { Map } from 'immutable';

import nodes from '~/components/nodes';
import marks from '~/components/marks';
import { initialValue } from '~/utils/utils';
import ImageUploader from '~/components/utils/ImageUploader';
import paster, { getPasteType } from '~/events/paste';
import command from '~/commands';
import NodeWrapper from '~/components/wrappers/NodeWrapper';
import DataContext from '~/components/contexts/Data';

export default class ReEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(props.value || initialValue),
      data: Map()
    }
    this.editor = React.createRef();
  }


  handleChange = ({ value }) => {
    const { onChange, autoFocus } = this.props;
    this.setState({ value });
    onChange(value);
  }

  onChangeData = (changer, callback = () => {}) => {
    this.setState(state => ({
      data: typeof changer === 'function' ? changer(state.data) : changer
    }), callback);
  }

  handleInsertImage = (image) => {
    const { data } = this.state;

    command(this.editor.current)('image', image);
  }

  handlePaste = (event, editor, next) => {
    const transfer = getEventTransfer(event);
    const type = getPasteType(transfer);
    const paste = paster[type];
    if (paste) {
      return paste({ editor, transfer });
    }
    next();
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
        <NodeWrapper editor={editor} node={node} {...rest}>
          <Component node={node} editor={editor} {...attributes}>
            {children}
          </Component>
        </NodeWrapper>
      )
    }
    return next();
  }

  render() {
    const { placeholder, autoFocus, className } = this.props;
    const { value, data } = this.state;

    return (
      <DataContext.Provider value={{ value, data, onChangeData: this.onChangeData }}>
        <Editor
          value={value}
          onChange={this.handleChange}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
          ref={this.editor}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={className}
          onPaste={this.handlePaste}
        />
        <ImageUploader insertImage={this.handleInsertImage} />
      </DataContext.Provider>
    )
  }
}

ReEditor.defaultProps = {
  className: 're-editor'
}
