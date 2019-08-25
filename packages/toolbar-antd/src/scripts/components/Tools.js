import React, { useContext, useState, useEffect } from 'react';
import { Select, Tooltip } from 'antd';
import { command, TablePicker } from '@re-editor/core';

import Button from '~/components/Button';
import Icon from '~/components/Icon';
import Context from '~/components/Context';

const handleSelect = (value, editor) => {
  command(editor)(value);
};

export const bold = () => <Button type="bold" title="粗体" />;
export const italic = () => <Button type="italic" title="斜体" />;
export const underline = () => <Button type="underline" title="下划线" />;
export const strikethrough = () => (
  <Button type="strikethrough" title="删除线" />
);
export const orderedlist = () => <Button type="orderedlist" title="有序列表" />;
export const unorderedlist = () => (
  <Button type="unorderedlist" title="无序列表" />
);
export const image = () => (
  <Button type="image-local" icon="image" title="图片（支持快捷键粘贴）" />
);
export const code = () => <Button type="code" title="代码" />;
export const undo = () => <Button type="undo" title="撤销" />;
export const redo = () => <Button type="redo" title="重做" />;

export const heading = () => {
  const { editor } = useContext(Context);
  return (
    <Select
      defaultValue="paragraph"
      size="small"
      onSelect={v => handleSelect(v, editor)}
    >
      <Select.Option value="paragraph">正文</Select.Option>
      <Select.Option value="h1">标题1</Select.Option>
      <Select.Option value="h2">标题2</Select.Option>
      <Select.Option value="h3">标题3</Select.Option>
    </Select>
  );
};
export const align = () => {
  const { editor } = useContext(Context);
  return (
    <Select
      defaultValue="align-left"
      size="small"
      onSelect={v => handleSelect(v, editor)}
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
  );
};

export const table = () => {
  const [isShowTablePicker, setTablePicker] = useState(false);
  const { editor } = useContext(Context);

  function handleClickPicker(row, column, event) {
    event.stopPropagation();
    command(editor)('table', row, column);
    setTablePicker(false);
  }
  return (
    <div className="tool-table-container">
      {isShowTablePicker && <TablePicker onClick={handleClickPicker} />}
      <Button
        type="table"
        title="表格"
        onMouseDown={() => setTablePicker(isShow => !isShow)}
      />
    </div>
  );
};

export const fullscreen = () => {
  const [isFullscreen, setFullscreen] = useState(false);
  function toggleFullscreen() {
    setFullscreen(!isFullscreen);
  }
  useEffect(() => {
    window.addEventListener('fullscreen', toggleFullscreen);
    return () => {
      window.removeEventListener('fullscreen', toggleFullscreen);
    };
  });
  return isFullscreen ? (
    <Button type="fullscreen" icon="quxiaoquanping" title="取消全屏" />
  ) : (
    <Button type="fullscreen" icon="fullScreen" title="全屏" />
  );
};
