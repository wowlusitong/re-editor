import React from 'react';
import { withProps } from 'recompose';

import Icon from '~/components/utils/Icon';
import Item from '~/components/utils/ToolItem';
import { setData } from '~/utils/utils';

@withProps(props => ({
  language: props.node.data.get('language')
}))
export default class Code extends React.Component {
  handleChange = event => {
    const { editor, node } = this.props;
    setData(editor, node, d => d.set('language', event.target.value));
  };

  handleDelete = event => {
    event.stopPropagation();
    const { editor, node } = this.props;
    editor.removeNodeByKey(node.key);
  };

  render() {
    const { language } = this.props;
    return (
      <>
        <select
          contentEditor={true}
          onChange={this.handleChange}
          value={language}
        >
          <option>javascript</option>
          <option>html</option>
          <option>css</option>
        </select>
        <Item.Split />
        <Item hover tip="删除" onClick={this.handleDelete}>
          <Icon type="icon-delete" />
        </Item>
      </>
    );
  }
}
