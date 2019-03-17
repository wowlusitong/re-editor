import React from 'react';
import { withProps, fromRenderProps } from 'recompose';

import DataContext from '~/components/contexts/Data';
import Item from '~/components/utils/ToolItem';
import Icon from '~/components/utils/Icon';
import command from '~/commands';
import SlateInput from '~/components/utils/SlateInput';
import { setData } from '~/utils/utils';

@fromRenderProps(DataContext.Consumer, ({ data, onChangeData }) => ({ data, onChangeData }))
@withProps((props) => ({
  width: props.node.data.get('width'),
  height: props.node.data.get('height')
}))
export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height
    }
  }

  handleReplace = () => {
    const { editor, node, onChangeData } = this.props;

    //FIXME
    window.replaceNodeKey = node.key
    command(editor)('image-local');
  }

  handleDelete = (event) => {
    event.stopPropagation();

    const { editor, node } = this.props;
    editor.removeNodeByKey(node.key)
  }

  handleChangeWidth = (width) => {
    const { editor , node } = this.props;
    this.setState({
      width
    });
    setData(editor, node, d => d.set('width', width));
  }

  handleChangeHeight = (height) => {
    const { editor, node } = this.props;
    this.setState({
      height
    });
    setData(editor, node, d => d.set('height', height));
  }

  render() {
    const { width, height } = this.state;

    return (
      <>
        <Item tip="设置宽度">
          <SlateInput value={width} onChange={this.handleChangeWidth} />
        </Item>
        <Item tip="设置高度">
          <SlateInput value={height} onChange={this.handleChangeHeight} />
        </Item>
        <Item.Split />
        <Item hover tip="替换" onClick={this.handleReplace}>
          <Icon type="icon-interation" />
        </Item>
        <Item hover tip="删除" onClick={this.handleDelete}>
          <Icon type="icon-delete" />
        </Item>
      </>
    )
  }
}
