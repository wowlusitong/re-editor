import React from 'react';
import { Select, Tooltip } from 'antd';
import { command, TablePicker } from '@re-editor/core';

import Button from '~/components/Button';
import Icon from '~/components/Icon';
import Context from '~/components/Context';

export default class Toolbar extends React.Component {
  state = {
    isShowTablePicker: false,
    isFullscreen: false
  };

  handleSelect = value => {
    const { editor } = this.props;

    command(editor)(value);
  };

  handleClickTable = () => {
    this.setState({
      isShowTablePicker: !this.state.isShowTablePicker
    });
  };

  handleClickPicker = (row, column, event) => {
    event.stopPropagation();
    const { editor } = this.props;
    command(editor)('table', row, column);
    this.setState({
      isShowTablePicker: false
    });
  };

  toggleFullscreen = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  };

  componentDidMount() {
    window.addEventListener('fullscreen', this.toggleFullscreen);
  }

  componentWillUnmount() {
    window.removeEventListener('fullscreen', this.toggleFullscreen);
  }

  render() {
    const { value, editor } = this.props;
    const { isShowTablePicker, isFullscreen } = this.state;

    return (
      <Context.Provider value={{ value, editor }}>
        <div className="toolbar-antd-cotnainer">
          {isShowTablePicker && (
            <TablePicker onClick={this.handleClickPicker} />
          )}
          <Button.Group>
            <Button type="bold" title="粗体" />
            <Button type="italic" title="斜体" />
            <Button type="underline" title="下划线" />
            <Button type="strikethrough" title="删除线" />
          </Button.Group>
          <Button.Group>
            <Button type="orderedlist" title="有序列表" />
            <Button type="unorderedlist" title="无序列表" />
          </Button.Group>
          <Select
            defaultValue="paragraph"
            size="small"
            onSelect={this.handleSelect}
          >
            <Select.Option value="paragraph">正文</Select.Option>
            <Select.Option value="h1">标题1</Select.Option>
            <Select.Option value="h2">标题2</Select.Option>
            <Select.Option value="h3">标题3</Select.Option>
          </Select>
          <Select
            defaultValue="align-left"
            size="small"
            onSelect={this.handleSelect}
          >
            <Select.Option value="align-left">
              <Tooltip title="左对齐">
                <Icon type="icon-align-left" />
              </Tooltip>
            </Select.Option>
            <Select.Option value="align-center">
              <Tooltip title="居中对齐">
                <Icon type="icon-align-center" />
              </Tooltip>
            </Select.Option>
            <Select.Option value="align-right">
              <Tooltip title="右对齐">
                <Icon type="icon-align-right" />
              </Tooltip>
            </Select.Option>
            <Select.Option value="align-justify">
              <Tooltip title="两端对齐">
                <Icon type="icon-menu" />
              </Tooltip>
            </Select.Option>
          </Select>
          <Button.Group>
            <Button
              type="image-local"
              icon="image"
              title="图片（支持快捷键粘贴）"
            />
            <Button
              type="table"
              title="表格"
              onMouseDown={this.handleClickTable}
            />
            <Button type="code" title="代码" />
          </Button.Group>
          <Button.Group>
            <Button type="undo" title="撤销" />
            <Button type="redo" title="重做" />
          </Button.Group>
          {isFullscreen ? (
            <Button type="fullscreen" icon="quxiaoquanping" title="取消全屏" />
          ) : (
            <Button type="fullscreen" icon="fullScreen" title="全屏" />
          )}
        </div>
      </Context.Provider>
    );
  }
}
