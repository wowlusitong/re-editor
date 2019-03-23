import React from 'react';
import { Value, Decoration } from 'slate';
import { Editor, getEventTransfer } from 'slate-react';
import { Map } from 'immutable';
import Prism from 'prismjs';

import nodes from '~/components/nodes';
import marks from '~/components/marks';
import { initialValue, getContent } from '~/utils/utils';
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
    };
    this.editor = React.createRef();
  }

  handleChange = ({ value }) => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange(value);
  };

  onChangeData = (changer, callback = () => {}) => {
    this.setState(
      state => ({
        data: typeof changer === 'function' ? changer(state.data) : changer
      }),
      callback
    );
  };

  handleInsertImage = image => {
    command(this.editor.current)('image', image);
  };

  handlePaste = (event, editor, next) => {
    const transfer = getEventTransfer(event);
    const type = getPasteType(transfer);
    const paste = paster[type];
    if (paste) {
      return paste({ editor, transfer });
    }
    next();
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;
    const Component = marks[mark.type];
    if (Component) {
      return <Component {...attributes}>{children}</Component>;
    }
    return next();
  };

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
      );
    }
    return next();
  };

  decorateNode = (node, editor, next) => {
    if (node.type !== 'code') {
      return next();
    }
    const language = node.data.get('language', 'javascript');
    const texts = node.getTexts().toArray();
    const string = texts.map(t => t.text).join('\n');
    const grammar = Prism.languages[language];
    const tokens = Prism.tokenize(string, grammar).filter(
      token => typeof token === 'object'
    );
    const decorations = [];
    let text = texts[0];
    let startOffset = 0;
    let endOffset = 0;
    tokens.forEach(token => {
      const content = getContent(token);
      const index = texts.findIndex(text => text.text.includes(content));
      if (index < 0) {
        return;
      }
      text = texts[index];
      if (texts[index].text === content) {
        startOffset = 0;
        endOffset = text.text.length;
      } else {
        startOffset = text.text.indexOf(content);
        endOffset = startOffset + content.length;
      }
      if (endOffset + 1 === text.text.length) {
        texts.splice(index, 1);
      }
      decorations.push(
        new Decoration({
          anchor: {
            key: text.key,
            offset: startOffset
          },
          focus: {
            key: text.key,
            offset: endOffset
          },
          mark: {
            type: token.type
          }
        })
      );
    });
    return decorations;
  };

  render() {
    const { placeholder, autoFocus, className } = this.props;
    const { value, data } = this.state;

    return (
      <DataContext.Provider
        value={{ value, data, onChangeData: this.onChangeData }}
      >
        <Editor
          value={value}
          onChange={this.handleChange}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
          decorateNode={this.decorateNode}
          ref={this.editor}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={className}
          onPaste={this.handlePaste}
        />
        <ImageUploader insertImage={this.handleInsertImage} />
      </DataContext.Provider>
    );
  }
}

ReEditor.defaultProps = {
  className: 're-editor'
};
