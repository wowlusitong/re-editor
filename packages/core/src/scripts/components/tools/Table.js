import React from 'react';

import Icon from '~/components/utils/Icon';
import Item from '~/components/utils/ToolItem';
import Table from '~/utils/table';

export default class TableTool extends React.Component {
  handleDelete = event => {
    event.stopPropagation();
    const { editor, node } = this.props;
    editor.removeNodeByKey(node.key);
  };

  handleInsertBelowRow = () => {
    const { editor } = this.props;
    new Table(editor).insertRow('below');
  };

  handleInsertAboveRow = () => {
    const { editor } = this.props;
    new Table(editor).insertRow('above');
  };

  handleRemoveRow = () => {
    const { editor } = this.props;
    new Table(editor).removeFocusRow();
  };

  handleRemoveColumn = () => {
    const { editor } = this.props;
    new Table(editor).removeFocusColumn();
  };

  handleInsertRightCloumn = () => {
    const { editor } = this.props;
    new Table(editor).insertColumn('right');
  };

  handleInsertLeftCloumn = () => {
    const { editor } = this.props;
    new Table(editor).insertColumn('left');
  };

  render() {
    return (
      <>
        <Item hover tip="删除选中行" onClick={this.handleRemoveRow}>
          <Icon type="icon-remove-row" />
        </Item>
        <Item hover tip="上方增加行" onClick={this.handleInsertAboveRow}>
          <Icon type="icon-insert-row" />
        </Item>
        <Item hover tip="下方增加行" onClick={this.handleInsertBelowRow}>
          <Icon type="icon-InsertRowAfter" />
        </Item>
        <Item.Split />
        <Item hover tip="删除选中列" onClick={this.handleRemoveColumn}>
          <Icon type="icon-remove-column" />
        </Item>
        <Item hover tip="左方增加列" onClick={this.handleInsertLeftCloumn}>
          <Icon type="icon-insert-column" />
        </Item>
        <Item hover tip="右方增加列" onClick={this.handleInsertRightCloumn}>
          <Icon type="icon-InsertColumnAfter" />
        </Item>
        <Item.Split />
        <Item hover tip="删除" onClick={this.handleDelete}>
          <Icon type="icon-delete" />
        </Item>
      </>
    );
  }
}
