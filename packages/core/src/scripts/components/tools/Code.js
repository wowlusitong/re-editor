import React from 'react';
import { fromRenderProps, withProps } from 'recompose';

import DataContext from '~/components/contexts/Data';
import Icon from '~/components/utils/Icon';
import Item from '~/components/utils/ToolItem';
import { setData } from '~/utils/utils';

@fromRenderProps(DataContext.Consumer, ({ data, onChangeData }) => ({
  data,
  onChangeData
}))
@withProps(props => ({
  language: props.node.data.get('language')
}))
export default class Code extends React.Component {
  handleChange = event => {
    const { editor, node } = this.props;
    setData(editor, node, d => d.set('language', event.target.value));
  };

  handleDelete = () => {
    const { editor, node } = this.props;
    editor.removeNodeByKey(node.key);
  };

  handleSuccess = () => {
    const { editor, node, onChangeData } = this.props;
    onChangeData(
      d => d.setIn([node.key, 'isSelected'], false),
      () => {
        editor
          .moveToRangeOfNode(node)
          .moveToEnd()
          .insertBlock('paragraph')
          .unwrapBlock();
      }
    );
  };

  render() {
    const { language } = this.props;
    return (
      <>
        <select onChange={this.handleChange} value={language}>
          <option>javascript</option>
          <option>html</option>
          <option>css</option>
        </select>
        <Item hover tip="删除" onClick={this.handleDelete}>
          <Icon type="icon-delete" />
        </Item>
        <Item.Split />
        <Item hover tip="跳出" onClick={this.handleSuccess}>
          <Icon type="icon-enter" />
        </Item>
      </>
    );
  }
}
