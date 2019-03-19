import React from 'react';

import Icon from '~/components/utils/Icon';
import Item from '~/components/utils/ToolItem';

export default class Table extends React.Component {
  handleDelete = event => {
    event.stopPropagation();
    const { editor, node } = this.props;
    editor.removeNodeByKey(node.key);
  };

  handleInsertColumn = event => {
    event.stopPropagation();
    const { editor } = this.props;
    editor.insertBlock('td');
  };

  handleInsertRow = event => {
    event.stopPropagation();
    const { editor, node } = this.props;
    const tbody = node.getDescendant([0]);
    editor.insertNodeByKey(tbody.key, tbody.nodes.size, {
      object: 'block',
      type: 'tr',
      nodes: Array(node.getDescendant([0, 0]).nodes.size).fill({
        object: 'block',
        type: 'td'
      })
    });
  };

  handleRemoveRow = event => {
    event.stopPropagation();
    const { editor, node } = this.props;
    const focusRow = node
      .getDescendant([0])
      .nodes.find(node => node.hasDescendant(editor.value.focusBlock.key));
    editor.removeNodeByKey(focusRow.key);
  };

  handleRemoveColumn = event => {
    event.stopPropagation();
    const { editor } = this.props;
    editor.removeNodeByKey(editor.value.focusBlock.key);
  };

  render() {
    return (
      <>
        <Item hover tip="删除选中行">
          <Icon type="icon-remove-column" onClick={this.handleRemoveColumn} />
        </Item>
        <Item hover tip="增加列">
          <Icon type="icon-insert-column" onClick={this.handleInsertColumn} />
        </Item>
        <Item.Split />
        <Item hover tip="删除选中行">
          <Icon type="icon-remove-row" onClick={this.handleRemoveRow} />
        </Item>
        <Item hover tip="增加行">
          <Icon type="icon-insert-row" onClick={this.handleInsertRow} />
        </Item>
        <Item.Split />
        <Item hover tip="删除">
          <Icon type="icon-delete" onClick={this.handleDelete} />
        </Item>
      </>
    );
  }
}
