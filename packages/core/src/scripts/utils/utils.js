import React from 'react';
import { Value } from 'slate';

export const initialValue = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [{ text: '' }]
          }
        ]
      }
    ]
  }
};

export function generateElementComponents(natives) {
  return Object.keys(natives).reduce((components, name) => {
    const element = natives[name];
    const component = ({ node, value, onChange, parent, editor, ...props }) =>
      React.createElement(
        element.name,
        element.props ? Object.assign(props, element.props) : props
      );
    components[name] = component;
    return components;
  }, {});
}

export function hasMark(value, type) {
  return value.activeMarks.some(mark => mark.type === type);
}

export function hasBlock(value, type) {
  return value.blocks.some(node => node.type === type);
}

export function isActive(value, type) {
  return hasMark(value, type) || hasBlock(value, type);
}

export function toValue(value) {
  return Value.fromJSON(value);
}

export function isIgnoreWrapper(type) {
  return ['tr', 'td', 'tbody', 'thead'].includes(type);
}

export function setData(editor, node, changeData) {
  editor.setNodeByKey(node.key, { data: changeData(node.data) });
}

export function getContent(token) {
  if (typeof token === 'string') {
    return token;
  } else if (typeof token.content === 'string') {
    return token.content;
  } else {
    return token.content.map(getContent).join('');
  }
}

export function getMarkdownType(chars) {
  switch (chars) {
    case '-':
    case '•':
      return 'unorderedlist';
    case '>':
      return 'blockquote';
    case '#':
      return 'h1';
    case '##':
      return 'h2';
    case '###':
      return 'h3';
    case '####':
      return 'h4';
    case '#####':
      return 'h5';
    case '######':
      return 'h6';
    case /^\d+\./.test(chars) && chars:
      return 'orderedlist';
    default:
      return null;
  }
}

export function getForeFather(editor) {
  const value = editor.value;
  const nodes = value.document.nodes;
  const focusKey = value.selection.focus.key;
  return nodes.find(node => node.hasDescendant(focusKey));
}
