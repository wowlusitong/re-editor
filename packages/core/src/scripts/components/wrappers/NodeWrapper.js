import React from 'react';
import { withProps, fromRenderProps } from 'recompose';

import DataContext from '~/components/contexts/Data';
import ToolWrapper from '~/components/wrappers/ToolWrapper';
import tools from '~/components/tools';
import { isIgnoreWrapper } from '~/utils/utils';

@fromRenderProps(DataContext.Consumer, ({ data, onChangeData }) => ({
  data,
  onChangeData
}))
@withProps(props => {
  const { data, node, isSelected, readOnly } = props;
  return {
    Tool: tools[node.type],
    isSelected: readOnly
      ? false
      : data.getIn([node.key, 'isSelected'], isSelected)
  };
})
export default class NodeWrapper extends React.Component {
  handleClick = event => {
    const { node, onChangeData, editor } = this.props;
    const toolbar = document.querySelector('.tool-wrapper');
    const isInPlugin = toolbar && toolbar.contains(event.target);
    if (!isInPlugin) {
      onChangeData(
        d => d.setIn([node.key, 'isSelected'], true),
        () => {
          if (['Image'].includes(node.type)) {
            editor.moveToRangeOfNode(node);
          }
        }
      );
    }
  };

  handleDeselect = () => {
    const { onChangeData, node } = this.props;
    onChangeData(d => d.setIn([node.key, 'isSelected'], false));
  };

  render() {
    const { node, editor, children, Tool, isSelected } = this.props;
    if (isIgnoreWrapper(node.type)) {
      return children;
    }
    return (
      <div
        onClick={this.handleClick}
        className={`node-wrapper node-wrapper-${node.type}`}
      >
        {children}
        {isSelected && Tool && (
          <ToolWrapper onClick={this.handleDeselect}>
            <Tool editor={editor} node={node} />
          </ToolWrapper>
        )}
      </div>
    );
  }
}
