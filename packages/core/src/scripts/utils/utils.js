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

export function setData(editor, node, changeData) {
  editor.setNodeByKey(node.key, { data: changeData(node.data) });
}
