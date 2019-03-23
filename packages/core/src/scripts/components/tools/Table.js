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
        <Item hover tip="删除选中行" onClick={this.handleRemoveColumn}>
          <Icon type="icon-remove-column" />
        </Item>
        <Item hover tip="增加列" onClick={this.handleInsertColumn}>
          <Icon type="icon-insert-column" />
        </Item>
        <Item.Split />
        <Item hover tip="删除选中行" onClick={this.handleRemoveRow}>
          <Icon type="icon-remove-row" />
        </Item>
        <Item hover tip="增加行" onClick={this.handleInsertRow}>
          <Icon type="icon-insert-row" />
        </Item>
        <Item.Split />
        <Item hover tip="删除" onClick={this.handleDelete}>
          <Icon type="icon-delete" />
        </Item>
      </>
    );
  }
}
